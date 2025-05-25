import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    setDropdownOpen(false);
    navigate('/login', { replace: true });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar-wrapper">
      <nav className="custom-navbar">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <span className="logo-blue">CV.</span>
          <span className="logo-dark">IO</span>
        </div>

        <div className="navbar-links">
          <div className='user-section-wrapper' ref={dropdownRef}>
            <div className='user-section'>
              <span className='user-icon'>
                <FontAwesomeIcon icon={faUser} style={{ height: '20px', width: '20px' }} />
              </span>
              {username ? (
                <>
                  <span className='username' onClick={toggleDropdown}>
                    {username}
                  </span>
                  {dropdownOpen && (
                    <div className='dropdown'>
                      <span onClick={handleLogout}>Log out</span>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className='login-button'>Log in</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
