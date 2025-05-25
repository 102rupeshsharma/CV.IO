import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './MyResume.css';
import Template1 from '../../TemplatesComponents/Template1/Template1';
import Template2 from '../../TemplatesComponents/Template2/Template2';
import Template3 from '../../TemplatesComponents/Template3/Template3';
import Template4 from '../../TemplatesComponents/Template4/Template4';

function MyResume({ showModal, onClose }) {
  const modalRef = useRef();

  const personalInfo = useSelector((state) => state.dataStore.personalInfo);
  const summaryInfo = useSelector((state) => state.dataStore.summary)
  const educationInfo = useSelector((state) => state.dataStore.education); // changed from educationInfo
  const experienceInfo = useSelector((state) => state.dataStore.workEx);   // changed from experienceInfo
  const skillsInfo = useSelector((state) => state.dataStore.skills);
  const selectedTemplate = useSelector((state) => state.dataStore.selectedTemplate);

  const resumeData = {
    personalInfo,
    summary: summaryInfo,
    education: educationInfo,
    workEx: experienceInfo,
    skills: skillsInfo,
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal, onClose]);

  if (!showModal) return null;

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'Template 1':
        return <Template1 data={resumeData} />;
      case 'Template 2':
        return <Template2 data={resumeData} />;
      case 'Template 3':
        return <Template3 data={resumeData} />;
      case 'Template 4':
        return <Template4 data={resumeData} />;
      default:
        return (
          <div className="no-resume-message">
            <h1>No resume saved yet! Go back</h1>
          </div>
        );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content resume-a4" ref={modalRef}>
        <div className="resume-content">
          <div id="divToPrint">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyResume;
