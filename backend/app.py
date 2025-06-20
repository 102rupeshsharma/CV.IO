from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
from dotenv import load_dotenv
import bcrypt
import jwt
import os
import datetime
import requests 
from functools import wraps
from google.oauth2 import id_token
from google.auth.transport import requests as grequests

# -------------------- Load .env variables --------------------
load_dotenv()

# -------------------- App Configuration --------------------
app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY")

mongo = PyMongo(app)
users_collection = mongo.db.users

# -------------------- JWT Token Decorator --------------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            try:
                token = request.headers['Authorization'].split(" ")[1]
            except IndexError:
                return jsonify({"message": "Token format is invalid"}), 401

        if not token:
            return jsonify({"message": "Token is missing!"}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = users_collection.find_one({"_id": ObjectId(data["user_id"])})
            if not current_user:
                raise Exception("User not found")
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired!"}), 401
        except Exception as e:
            return jsonify({"message": "Token is invalid!", "error": str(e)}), 401

        return f(current_user, *args, **kwargs)
    return decorated

# -------------------- Register Route --------------------
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not (username and email and password):
        return jsonify({"message": "All fields are required"}), 400

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "Email already registered"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = {
        "username": username,
        "email": email,
        "password": hashed_password
    }

    inserted = users_collection.insert_one(new_user)
    return jsonify({"message": "Registration successful", "user_id": str(inserted.inserted_id)}), 200

# -------------------- Login Route (JWT Issued) --------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not (email and password):
        return jsonify({"message": "Email and password are required"}), 400

    user = users_collection.find_one({"email": email})
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode({
        "user_id": str(user["_id"]),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "username": user["username"]
        }
    }), 200

# -------------------- Google Login Route --------------------
@app.route('/google-login', methods=['POST'])
def google_login():
    data = request.get_json()
    access_token = data.get("access_token")

    if not access_token:
        return jsonify({"message": "Access token is required"}), 400

    try:
        # Use the access token to fetch user info from Google
        google_user_info_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        response = requests.get(
            google_user_info_url,
            headers={"Authorization": f"Bearer {access_token}"}
        )

        if response.status_code != 200:
            return jsonify({"message": "Failed to fetch user info from Google"}), 400

        user_info = response.json()
        email = user_info.get("email")
        name = user_info.get("name")

        if not email:
            return jsonify({"message": "Email not found in Google user info"}), 400

        # Check if user exists
        user = users_collection.find_one({"email": email})
        if not user:
            # Register user
            new_user = {
                "username": name,
                "email": email,
                "password": None,
                "google": True
            }
            inserted = users_collection.insert_one(new_user)
            user_id = str(inserted.inserted_id)
        else:
            user_id = str(user["_id"])

        # Generate JWT
        jwt_token = jwt.encode({
            "user_id": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "message": "Google login successful",
            "token": jwt_token,
            "user": {
                "id": user_id,
                "username": name,
                "email": email
            }
        }), 200

    except Exception as e:
        return jsonify({"message": "Error during Google login", "error": str(e)}), 500


# -------------------- Protected Route Example --------------------
@app.route('/profile', methods=['GET'])
@token_required
def profile(current_user):
    return jsonify({
        "username": current_user["username"],
        "email": current_user["email"]
    }), 200

# -------------------- Main --------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
