import React from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';
import './Template3.css';

function Template3() {
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
    const country = personalInfo.country || "";
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
        <div className='template3-container'>
            <div className='template3-left'>
                {profileImage ? (
                    <img className='template3-profile-pic' src={profileImage} alt="profile-pic" />
                ) : null}
                <div className='template3-name'>{firstName} {lastName}</div>
                <div className='template3-title'>{currentJobTitle}</div>
                <div className='template3-contact'>
                    <div className='template3-contact-label'>Email:</div>
                    <div>{email}</div>
                    <div className='template3-contact-label'>Contact:</div>
                    <div>{phone}</div>
                    <div className='template3-contact-label'>Address:</div>
                    <div>{state}, {country}, {pin}</div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className='template3-right'>
                {/* Summary */}
                <div className='template3-objective'>
                    {summary.objective}
                </div>

                <hr className='template3-divider' />

                {/* Work Experience */}
                <div>
                    <h3 className='template3-section-title'>Professional Experience</h3>
                    <div className='template3-section-content'>
                        {workEx.map(item => (
                            <div key={shortid.generate()} style={{ marginBottom: "1rem" }}>
                                <b style={{ fontSize: '21px' }}>{item.employer}</b>
                                <div>{`Worked in ${item.employer} as ${item.jobTitle} from ${formatShortMonthYear(item.startMonth, item.startYear)} to ${formatShortMonthYear(item.endMonth, item.endYear)}.`}</div>
                                <p>at {item.location}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className='template3-divider' />

                {/* Education */}
                <div>
                    <h3 className='template3-section-title'>Education</h3>
                    <div className='template3-section-content'>
                        {education.map(item => {
                            const degree =
                                item.degree && item.degree !== "Select different degree"
                                    ? item.degree
                                    : item.otherDegree || "Your Degree";
                            return (
                                <div key={shortid.generate()} style={{ marginBottom: "1rem" }}>
                                    <b style={{ fontSize: '21px' }}>{degree} </b>
                                    <p>I have pursued my {item.degree} in {item.fieldOfStudy} from <b>{item.schoolName}</b> at {item.schoolLocation}.</p>
                                    <p>Graduation: {formatShortMonthYear(item.gradMonth, item.gradYear)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <hr className='template3-divider' />

                {/* Skills */}
                <div>
                    <h3 className='template3-section-title'>Key Skills</h3>
                    <ul className='template3-skill-list'>
                        {skills.map(skill => (
                            <li key={shortid.generate()}>{skill.skillName}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Template3;