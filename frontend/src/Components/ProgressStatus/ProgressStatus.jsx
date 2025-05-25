import React, { useState, useEffect } from 'react';
import './ProgressStatus.css';
import { useLocation, Link, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PersonalInfo from '../DetailsFillComponents/PersonalDetails/PersonalInfo';
import Education from '../DetailsFillComponents/Education/Education';
import KeySkills from '../DetailsFillComponents/Skills/KeySkills';
import WorkEx from '../DetailsFillComponents/WorkExp/WorkEx';
import Summary from '../DetailsFillComponents/Summary/Summary';
import ResumeSaver from '../DetailsFillComponents/ResumeSaver/ResumeSaver';
import { updateState } from '../../ReduxManager/dataStoreSlice';

const ProgressStatus = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const personalInfo = useSelector(state => state.dataStore.personalInfo);
  const workEx = useSelector(state => state.dataStore.workEx);
  const education = useSelector(state => state.dataStore.education);
  const skills = useSelector(state => state.dataStore.skills);
  const errorMessages = useSelector(state => state.dataStore.errorMessages);
  const hasErrors = Object.values(errorMessages).some(err => err !== "");

  const [isFormValid, setIsFormValid] = useState(true);

  const navigateHome = () => {
    navigate('/home');
  };

  useEffect(() => {
    const isPersonalInfoValid = personalInfo.firstName.trim() !== "" &&
      personalInfo.email.trim() !== "" &&
      personalInfo.phone.trim() !== "";

    const isWorkExValid = workEx.every(item =>
      item.jobTitle.trim() !== "" &&
      item.employer.trim() !== "" &&
      item.startMonth.trim() !== "" &&
      item.startYear.trim() !== ""
    );

    const isEducationValid = education.every(item =>
      item.schoolName.trim() !== "" &&
      item.gradMonth.trim() !== "" &&
      item.gradYear.trim() !== ""
    );

    const isSkillsValid = skills.length > 0;

    setIsFormValid(isPersonalInfoValid && isWorkExValid && isEducationValid && isSkillsValid);
  }, [personalInfo, workEx, education, skills, errorMessages]);

  const onSideNavLinkClick = () => {
    if (hasErrors) {
      alert('Please fill all the necessary details correctly!');
      dispatch(updateState({
        key: 'showErrorMessages',
        value: true
      }));
    } else {
      dispatch(updateState({
        key: 'showErrorMessages',
        value: false
      }));
    }
  };

  return (
    <div className="details-page-container">
      <div className="stepper">
        <div className="navbar-brand" onClick={navigateHome}>
          <span className="logo-1">CV.</span>
          <span className="logo-2">IO</span>
        </div>

        <div className={`step ${location.pathname.toLowerCase().includes('personalinfo') ? 'active' : ''}`} onClick={onSideNavLinkClick}>
          <div className="step-circle">1</div>
          <Link to={hasErrors ? "#" : "personalinfo"} className="step-title">Personal Info</Link>
        </div>

        <div className={`step ${location.pathname.toLowerCase().includes('education') ? 'active' : ''}`} onClick={onSideNavLinkClick}>
          <div className="step-circle">2</div>
          <Link to={hasErrors ? "#" : "education"} className="step-title">Education</Link>
        </div>

        <div className={`step ${location.pathname.toLowerCase().includes('keyskills') ? 'active' : ''}`} onClick={onSideNavLinkClick}>
          <div className="step-circle">3</div>
          <Link to={hasErrors ? "#" : "keyskills"} className="step-title">Key Skills</Link>
        </div>

        <div className={`step ${location.pathname.toLowerCase().includes('workex') ? 'active' : ''}`} onClick={onSideNavLinkClick}>
          <div className="step-circle">4</div>
          <Link to={hasErrors ? "#" : "workex"} className="step-title">Work Experience</Link>
        </div>

        <div className={`step ${location.pathname.toLowerCase().includes('summary') ? 'active' : ''}`} onClick={onSideNavLinkClick}>
          <div className="step-circle">5</div>
          <Link to={hasErrors ? "#" : "summary"} className="step-title">Summary</Link>
        </div>

        <div className={`step ${location.pathname.toLowerCase().includes('resume') ? 'active' : ''}`} onClick={onSideNavLinkClick}>
          <div className="step-circle">6</div>
          <Link to={hasErrors ? "#" : "resume"} className="step-title">Finalize</Link>
        </div>
      </div>

      <div className="details-container">
        <Routes>
          <Route path="personalinfo" element={<PersonalInfo isFormValid={isFormValid} />} />
          <Route path="workex" element={<WorkEx isFormValid={isFormValid} />} />
          <Route path="education" element={<Education isFormValid={isFormValid} />} />
          <Route path="keyskills" element={<KeySkills isFormValid={isFormValid} />} />
          <Route path="summary" element={<Summary isFormValid={isFormValid} />} />
          <Route path="resume" element={<ResumeSaver isFormValid={isFormValid} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProgressStatus;
