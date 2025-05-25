import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import bcrypt
from dotenv import load_dotenv
import os
import re
import jwt
from datetime import datetime, timedelta

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

db_config = {
    'host': os.getenv('HOST'),
    'user': os.getenv('USER'),
    'password': os.getenv('PASSWORD'),
    'database': os.getenv('DATABASE')
}

JWT_SECRET = os.getenv('JWT_SECRET', 'secretkey')

def connect_db():
    return pymysql.connect(**db_config, cursorclass=pymysql.cursors.DictCursor)

def init_db():
    try:
        connection = connect_db()
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password_hash VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
        connection.commit()
    except pymysql.MySQLError as e:
        print("Error initializing database:", e)
    finally:
        connection.close()

@app.route('/')
def index():
    return "Backend is running!"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data received"}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    email_regex = r'^[^@]+@[^@]+\.[^@]+$'
    if not re.match(email_regex, email):
        return jsonify({"message": "Invalid email format"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        connection = connect_db()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            if cursor.fetchone():
                return jsonify({"message": "Email already registered"}), 409

            cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                           (username, email, hashed_password.decode('utf-8')))
            connection.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except pymysql.MySQLError as e:
        return jsonify({"message": "Database error", "error": str(e)}), 500

    finally:
        connection.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        connection = connect_db()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()

            if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
                user_id = user['id']
                username = user['username']

                token = jwt.encode(
                    {
                        'user_id': user_id,
                        'username': username,
                        'exp': datetime.utcnow() + timedelta(hours=1)
                    },
                    JWT_SECRET,
                    algorithm='HS256'
                )

                return jsonify({
                    "message": "Login successful",
                    "user": {"id": user_id, "username": username},
                    "token": token
                }), 200

            else:
                return jsonify({"message": "Invalid email or password"}), 401

    except pymysql.MySQLError as e:
        return jsonify({"message": "Database error", "error": str(e)}), 500

    finally:
        connection.close()

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
