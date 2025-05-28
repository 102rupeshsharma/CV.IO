import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Signup.css';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const Signup = () => {
  const apiUrl = import.meta.env.VITE_REGISTER_URL;
  const googleLoginUrl = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.username || !form.email || !form.password) {
      toast.warning("All fields are required!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login", {
          state: {
            fromRegister: true,
            message: data.message || "Registration successful!",
          },
        });
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error in registration!");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const res = await axios.post(googleLoginUrl, {
          access_token: tokenResponse.access_token,
        });

        const data = res.data;
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("token", data.token);
        toast.success("Google login successful!");
        navigate("/");
      } catch (error) {
        toast.error("Google login failed.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Google login was cancelled or failed.");
    },
    flow: "implicit",
  });

  return (
    <div className="signup-container">
      {isLoading && (
        <div className="full-page-loader">
          <div className="spinner"></div>
        </div>
      )}
      <div className="signup-auth-box">
        <div className="signup-section">
          <div className="heading" style={{ display: 'flex', justifyContent: 'center', fontSize: "35px" }}>
            <p>Register</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
              />
              <span><FontAwesomeIcon icon={faUser} /></span>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              <span><FontAwesomeIcon icon={faEnvelope} /></span>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span><FontAwesomeIcon icon={faLock} /></span>
            </div>

            <span className="password-checkbox">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label>Show password</label>
            </span>

            <div className="register-btn">
              <button type="submit" disabled={isLoading}>Register</button>
            </div>
          </form>

          <p className="social-text">or register with social platforms</p>

          <div className="social-icons">
            <button className="google-btn" onClick={() => googleLogin()}>
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="login-info">
          <p style={{ fontSize: "40px" }}>Welcome Back!</p>
          <p style={{ fontSize: "15px" }}>Already have an account?</p>
          <button onClick={() => navigate("/login")} disabled={isLoading}>Login</button>
        </div>
      </div>
    </div>
  );
};
