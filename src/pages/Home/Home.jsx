import React from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../../Components/Navigation/Navbar";
import './Home.css'
import resumeSvg from "../../assets/resume.svg";

export const Home = () => {

  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className='home_container'>
        <div className='home_leftcontainer'>
          <div className='home_heading'>
            Build Your Resume Easily To Get Job Ready.
          </div>
          <div className='home_subHeading'>
            Build your resume to get hired by the world's top companies.
          </div>
          <div>
            <button className='home_start_btn' onClick={() => navigate('/templates')}>Get Started</button>
          </div>
        </div>
        <div className='home_rightContainer'>
          <img className='home_bg' src={resumeSvg} alt="resume.jpg" />
        </div>
      </div>
    </>
  );
}

