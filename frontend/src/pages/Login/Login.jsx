import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Login.css';

export const Login = () => {
  const apiUrl = import.meta.env.VITE_LOGIN_URL;
  const googleLoginUrl = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = new URLSearchParams(location.search).get("redirectTo") || "/";

  useEffect(() => {
    if (location.state?.fromRegister && location.state?.message) {
      toast.success(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Login failed!");
        return response.json();
      })
      .then((data) => {
        if (data.message === "Login successful") {
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("user_id", data.user.id);
          localStorage.setItem("token", data.token);
          toast.success("Login successful!");
          navigate(redirectTo);
        } else {
          toast.error(data.message || "Login Failed!");
        }
      })
      .catch(() => toast.error("User doesn't exist."))
      .finally(() => setIsLoading(false));
  };

  // ✅ Google login function
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
        toast.success("Google Login successful!");
        navigate(redirectTo);
      } catch (error) {
        toast.error("Google login failed.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Google Login was cancelled or failed.");
    },
    flow: "implicit", // or "auth-code" if you use that flow
  });

  return (
    <div className="login-container">
      {isLoading && (
        <div className="full-page-loader">
          <div className="spinner"></div>
        </div>
      )}
      <div className="login_container">
        <div className="login-auth-box">
          <div className="signup-info">
            <p style={{ fontSize: "40px" }}>Hello, Welcome!</p>
            <p style={{ fontSize: "15px" }}>Don't have an account?</p>
            <button onClick={() => navigate(`/register`)} className="login-btn">
              Register
            </button>
          </div>

          <div className="login-section">
            <div className={`form-content ${isLoading ? 'blurred' : ''}`}>
              <div className="heading"><p>Login</p></div>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span><FontAwesomeIcon icon={faEnvelope} /></span>
                </div>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span><FontAwesomeIcon icon={faLock} /></span>
                </div>

                <span className='password-checkbox'>
                  <input
                    type='checkbox'
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label style={{ paddingLeft: "2px" }}>Show password</label>
                </span>

                <div className="login-btn">
                  <button type="submit">Login</button>
                </div>

                <p className="social-text">or register with social platforms</p>
              </form>

              <div className="social-icons">
                <button className="google-btn" onClick={() => googleLogin()}>
                  <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
                  Sign in with Google
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
