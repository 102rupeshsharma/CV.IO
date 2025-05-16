import React, { useRef } from 'react';
import './ResumeSaver.css';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Template1 from '../../TemplatesComponents/Template1/Template1';
import Template2 from '../../TemplatesComponents/Template2/Template2';
import Template3 from '../../TemplatesComponents/Template3/Template3';
import Template4 from '../../TemplatesComponents/Template4/Template4';

const ResumeSaver = () => {
  const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate);
  const personalInfo = useSelector((state) => state.dataStore.personalInfo);
  const summaryInfo = useSelector((state) => state.dataStore.summary);
  const educationInfo = useSelector((state) => state.dataStore.education);
  const experienceInfo = useSelector((state) => state.dataStore.workEx);
  const skillsInfo = useSelector((state) => state.dataStore.skills);

  const resumeData = {
    personalInfo,
    summary: summaryInfo,
    education: educationInfo,
    workEx: experienceInfo,
    skills: skillsInfo,
  };

  const resumeRef = useRef();

  const handleDownload = async () => {
    const element = resumeRef.current;

    // Add class to optimize for export
    element.classList.add('export-mode');

    // Wait for DOM changes to apply
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 1.5,
      backgroundColor: '#ffffff',
      useCORS: true,
    });

    element.classList.remove('export-mode');

    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (imgHeight <= pdfHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      let position = 0;
      let heightLeft = imgHeight;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        position -= pdfHeight;

        if (heightLeft > 0) {
          pdf.addPage();
        }
      }
    }

    pdf.save('my-resume.pdf');
  };

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
        return <p>No template selected</p>;
    }
  };

  return (
    <div className="resume-saver">
      <div ref={resumeRef} className="resume-preview">
        {renderTemplate()}
      </div>
      <div className="download-container">
        <button
          className="download-btn"
          aria-label="Download Resume"
          onClick={handleDownload}
        >
          Download Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeSaver;
