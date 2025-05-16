import React from 'react';
import { useSelector } from 'react-redux';
import './Template1.css';
import shortid from 'shortid';

const Template1 = () => {
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
    const monthsShort = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = monthsShort[monthIndex] || "Mon";
    return `${monthName} ${year || "Year"}`;
  };

  return (
    <div className="template-container">
      {/* Header */}
      <div className="header-row">
        <div className="profile-pic-container">
          {profileImage ? (
            <img className="profile-pic" src={profileImage} alt="profile-pic" />
          ) : (
            <div className="profile-pic placeholder-pic">No Image</div>
          )}
        </div>
        <div className="name-title">
          <div className="name">{firstName} {lastName}</div>
          <div className="title">{currentJobTitle}</div>
        </div>
        <div className="contact-info">
          <div>{email}</div>
          <div>{phone}</div>
          <div>{`${state}, ${country}, ${pin}`}</div>
        </div>
      </div>
      <div className="section-divider1" />

      {/* Objective */}
        <div className="objective-text">
          {
            summary.objective ? (
              <p>{summary.objective}</p>
            ) : (
              <p className="placeholder">e.g. A passionate software engineer seeking challenging roles to build impactful solutions.</p>
            )
          }

        </div>

      <div className="section-divider1" />
      
      <div className="two-column-section">
        <div className="section-heading-left">Experience</div>
        <div className="section-content-right">
          {workEx.length > 0 ? (
            workEx.map((item) => (
              <div key={shortid.generate()} className="experience-entry">
                <strong>{item.jobTitle}</strong>
                <div>{`Worked at ${item.employer || "Company"} from ${formatShortMonthYear(item.startMonth, item.startYear)} to ${formatShortMonthYear(item.endMonth, item.endYear)}`}</div>
                <div>{`at ${item.location || "Location"}`}</div>
              </div>
            ))
          ) : (
            <div className="placeholder">
              <strong>e.g. Software Developer</strong>
              <div>e.g. Worked as Junior Software Developer from August 2021 to September 2023.</div>
              <div>e.g. at New Delhi, India</div>
            </div>
          )}
        </div>
      </div>

      <div className="section-divider1" />
      {/* Education */}
      <div className="two-column-section">
        <div className="section-heading-left">Education</div>
        <div className="section-content-right">
          {education.length > 0 ? (
            education.map((item) => {
              const degree = 
                    item.degree === "Select different field" ? 
                    item.otherDegree || "Your Degree" : 
                    item.degree || item.otherDegree || "Your Degree";
              return (
                <div key={shortid.generate()} className="education-entry">
                  <strong>{degree}</strong>
                  <div>
                    I have pursued my {degree} in {item.fieldOfStudy || "your field of study"} from {item.schoolName || "University"} at {item.schoolLocation || "Location"}
                  </div>
                  <p>Graduation: {formatShortMonthYear(item.gradMonth, item.gradYear)}</p>
                </div>
              );
            })
          ) : (
            <div className="placeholder">
              <strong className='grey'>e.g. Bachelor of Technology</strong>
              <div className='grey'>e.g. I have pursued my undergraduate in Computer Science from XYZ University.</div>
              <p className='grey'>e.g. Graduation: Aug 2022</p>
            </div>
          )}
        </div>
      </div>

      <div className="section-divider1" />
      {/* Skills */}
      <div className="two-column-section" style={{ borderBottom: 'none' }}>
        <div className="section-heading-left">Key Skills</div>
        <div className="section-content-right">
          {skills.length > 0 ? (
            <ul>
              {skills.map((skill) => (
                <ol className="skill-item" key={shortid.generate()}>
                  {skill.skillName}
                </ol>
              ))}
            </ul>
          ) : (
            <ul className="placeholder">
              <li className="skill-item">React.js</li>
              <li className="skill-item">Node.js</li>
              <li className="skill-item">MongoDB</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Template1;

// import React from 'react';
// import './Template1.css';

// const Template1 = () => {
 

//   return (
//     <div className="template-container">
//       {/* Header */}
//       <div className="header-row">
//         <div className="profile-pic-container">
          
//             <div className="profile-pic placeholder-pic">No Image</div>
//         </div>
//         <div className="name-title">
//           <div className="name">Rupesh Sharma</div>
//           <div className="title">Junior Software Developer</div>
//         </div>
//         <div className="contact-info">
//           <div>ghost8322@gmail.com</div>
//           <div>7854263195</div>
//           <div>Gulbarga, Karnataka,585104</div>
//         </div>
//       </div>

//       {/* Objective */}
//       <div className="two-column-section">
//         <div className="section-content-right">
//           <p className="placeholder">e.g. Lorem ipsum dolor sit amet,
//              consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
//               Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
//               Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa 
//               quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo
//               , rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
//                Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
//                 eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
//                  enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus </p>
//         </div>
//       </div>


//       {/* Work Experience */}
//       <div className="two-column-section">
//         <div className="section-heading-left">Professional Experience</div>
//         <div className="section-content-right">

//           <div className="placeholder">
//             <strong>e.g. Software Developer</strong>
//             <div>e.g. Worked as Junior Software Developer from August 2021 to September 2023.</div>
//             <div>e.g. at New Delhi, India</div>
//           </div>
//         </div>
//       </div>

//       {/* Education */}
//       <div className="two-column-section">
//         <div className="section-heading-left">Education</div>
//         <div className="section-content-right">

//           <div className="placeholder">
//             <strong className='grey'>e.g. Bachelor of Technology</strong>
//             <div className='grey'>e.g. I have pursued my undergraduate in Computer Science from VTU University.</div>
//             <p className='grey'>e.g. Graduation: Aug 2022</p>
//           </div>
//         </div>
//       </div>

//       {/* Skills */}
//       <div className="two-column-section" style={{ borderBottom: 'none' }}>
//         <div className="section-heading-left">Key Skills</div>
//         <div className="section-content-right">
//           <ul className="placeholder">
//             <li className="skill-item">React.js</li>
//             <li className="skill-item">Node.js</li>
//             <li className="skill-item">MongoDB</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Template1;
