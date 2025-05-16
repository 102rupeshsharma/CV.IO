import React from 'react'
import { useSelector } from 'react-redux'
import './Template2.css'
import shortid from 'shortid';

const Template2 = () => {
  const data = useSelector((state) => state.dataStore);
  const personalInfo = data.personalInfo || {};
  const summary = data.summary || {};
  const workEx = data.workEx || [];
  const education = data.education || [];
  const skills = data.skills || [];

  const firstName = personalInfo.firstName || "";
  const lastName = personalInfo.lastName || "";
  const email = personalInfo.email || "";
  const phone = personalInfo.phone || "";
  const city = personalInfo.city || "";
  const state = personalInfo.state || "";
  const pin = personalInfo.pinCode || "";
  const profileImage = data.imageFile || "";

  const currentJobTitle = workEx.length > 0
    ? workEx[workEx.length - 1].jobTitle
    : "";

  const formatShortMonthYear = (month, year) => {
    const monthsShort = {
      January: "Jan", February: "Feb", March: "Mar", April: "Apr",
      May: "May", June: "Jun", July: "Jul", August: "Aug",
      September: "Sep", October: "Oct", November: "Nov", December: "Dec"
    };

    const monthName = monthsShort[month] || month || "Month";
    return `${monthName} ${year || "Year"}`;
  };

  return (
    <div className="template2-container">
      <div className="template2-header">
        <div className="profile-pic-container">
          {profileImage ? (
            <img className='template3-profile-pic' src={profileImage} alt="profile-pic" />
          ) : null}
        </div>
        <div className="name-container">
          <div className="name-text">
            {firstName} + " " + {lastName}
          </div>
          <div className="title-text">
            {currentJobTitle}
          </div>
        </div>
        <div className="contact-info">
          <div>{email}</div>
          <div>{phone}</div>
          <div>{`${state}, ${country}, ${pin}`}</div>
        </div>
      </div>

      <div className="section-divider" />
      <div className="objective-text">
        <p>{summary.objective}</p>
      </div>
      <div className="section-divider" />

      <div className="section">
        <div className="section-title"><h3>Experience</h3></div>
        <div className="section-content">
          {workEx.map((item) => (
            <div key={shortid.generate()} className="experience-entry">
              <strong>{item.jobTitle}</strong>
              <div>{`Worked at ${item.employer} from ${formatShortMonthYear(item.startMonth, item.startYear)} to ${formatShortMonthYear(item.endMonth, item.endYear)}`}</div>
              <div>{`at ${item.location}`}</div>
            </div>
          ))}
        </div>

        <div className="section-divider" />

        <div className="section-title">
          <h3>Education</h3>
        </div>
        <div className="section-content">
          {education.map((item) => {
            const degree = item.degree === "Select different field" ? item.otherDegree : item.degree || item.otherDegree;
            return (
              <div key={shortid.generate()} className="education-entry">
                <strong>{degree}</strong>
                <div>
                  I have pursued my {degree} in {item.fieldOfStudy} from {item.schoolName} at {item.schoolLocation}
                </div>
                <p>Graduation: {formatShortMonthYear(item.gradMonth, item.gradYear)}</p>
              </div>
            );
          })}
        </div>

        <div className="section-divider" />

        {skills.length > 0 && (
          <div className="two-column-section" style={{ borderBottom: 'none' }}>
            <div className="section-heading-left">Key Skills</div>
            <div className="section-content-right">
              <ul>
                {skills.map((skill) => (
                  <ol className="skill-item" key={shortid.generate()}>
                    {skill.skillName}
                  </ol>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Template2