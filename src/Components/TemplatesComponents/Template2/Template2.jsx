// import React from 'react'
// import { useSelector } from 'react-redux'
// import './Template2.css'
// import shortid from 'shortid';

// const Template2 = () => {
//     const data = useSelector((state) => state.dataStore);
//       const personalInfo = data.personalInfo || {};
//       const summary = data.summary || {};
//       const workEx = data.workEx || [];
//       const education = data.education || [];
//       const skills = data.skills || [];

//       const firstName = personalInfo.firstName || "";
//       const lastName = personalInfo.lastName || "";
//       const email = personalInfo.email || "";
//       const phone = personalInfo.phone || "";
//       const city = personalInfo.city || "";
//       const state = personalInfo.state || "";
//       const pin = personalInfo.pinCode || "";
//       const profileImage = data.imageFile || "";

//       const currentJobTitle = workEx.length > 0
//     ? workEx[workEx.length - 1].jobTitle
//     : "";

//   const formatShortMonthYear = (month, year) => {
//     const monthsShort = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
//     ];
//     const monthIndex = parseInt(month, 10) - 1;
//     const monthName = monthsShort[monthIndex] || "Mon";
//     return `${monthName} ${year || "Year"}`;
//   };

//     return (
//         <div className="template2-container">
//             <div className="template2-header">
//                 <div className="profile-pic-container">
//                 {profileImage ? (
//             <img className="profile-pic" src={profileImage} alt="profile-pic" />
//           ) : (
//             <div className="profile-pic placeholder-pic">No Image</div>
//           )}
//                 </div>
//                 <div className="name-container">
//                     <div className="name-text">
//                         {firstName} + " " + {lastName}
//                     </div>
//                     <div className="title-text">
//                     {currentJobTitle}
//                     </div>
//                 </div>
//                 <div className="contact-info">
//                     <div>{email}</div>
//                     <div>{phone}</div>
//                     <div>
//                          {city} + ", " +
//                             {state} + ", " +
//                             {pin}

//                     </div>
//                 </div>
//             </div>

//             <div className="section-divider" />
//             <div className="objective-text">
//             {
//             summary.objective ? (
//               <p>{summary.objective}</p>
//             ) : (
//               <p className="placeholder">e.g. A passionate software engineer seeking challenging roles to build impactful solutions.</p>
//             )
//           }
//             </div>
//             <div className="section-divider" />

//             <div className="section">
//                 <div className="section-title">
//                     <h3>Professional Experience</h3>
//                 </div>
//                 <div className="section-content">
//                 {workEx.length > 0 ? (
//             workEx.map((item) => (
//               <div key={shortid.generate()} className="experience-entry">
//                 <strong>{item.jobTitle}</strong>
//                 <div>`Worked at ${item.employer || "Company"} from ${formatShortMonthYear(item.startMonth, item.startYear)} to ${formatShortMonthYear(item.endMonth, item.endYear)}`</div>
//                 <div>`at ${item.location || "Location"}`</div>
//               </div>
//             ))
//           ) : (
//             <div className="placeholder">
//               <strong>e.g. Software Developer</strong>
//               <div>e.g. Worked as Junior Software Developer from August 2021 to September 2023.</div>
//               <div>e.g. at New Delhi, India</div>
//             </div>
//           )}
//                 </div>

//                 <div className="section-divider" />

//                 <div className="section-title">
//                     <h3>Education</h3>
//                 </div>
//                 <div className="section-content">
//                 {education.length > 0 ? (
//             education.map((item) => {
//               const degree = item.degree || item.otherDegree || "Your Degree";
//               return (
//                 <div key={shortid.generate()} className="education-entry">
//                   <strong>{degree}</strong>
//                   <div>
//                     I have pursued my {degree} in {item.fieldOfStudy || "your field of study"} from {item.schoolName || "University"} at {item.schoolLocation || "Location"}
//                   </div>
//                   <p>Graduation: {formatShortMonthYear(item.gradMonth, item.gradYear)}</p>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="placeholder">
//               <strong className='grey'>e.g. Bachelor of Technology</strong>
//               <div className='grey'>e.g. I have pursued my undergraduate in Computer Science from XYZ University.</div>
//               <p className='grey'>e.g. Graduation: Aug 2022</p>
//             </div>
//           )}
//                 </div>

//                 <div className="section-divider" />

//                 <div className="section-title">
//                     <h3>Key Skills</h3>
//                 </div>
//                 <div className="section-content">
//                     {skills.length > 0 ? (
//             <ul>
//               {skills.map((skill) => (
//                 <ol className="skill-item" key={shortid.generate()}>
//                   {skill.skillName}
//                 </ol>
//               ))}
//             </ul>
//           ) : (
//             <ul className="placeholder">
//               <li className="skill-item">React.js</li>
//               <li className="skill-item">Node.js</li>
//               <li className="skill-item">MongoDB</li>
//             </ul>
//           )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Template2

import React from 'react'
import './Template2.css'

const Template2 = () => {

  return (
    <div className="template2-container">
      <div className="template2-header">
        <div className="profile-pic-container">
          
            <div className="profile-pic placeholder-pic">No Image</div>
        </div>
        <div className="name-container">
          <div className="name-text">
            Rupesh Sharma
          </div>
          <div className="title-text">
            Software Developer
          </div>
        </div>
        <div className="contact-info">
          <div>102rupeshsharma@gmail.com</div>
          <div>7483124898</div>
          <div>
            Gulbarga, Karnataka, 585104

          </div>
        </div>
      </div>

      <div className="section-divider" />
      <div className="objective-text">

        <p>igula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, 
          nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
           Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
            arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu </p>
      </div>
      <div className="section-divider" />

      <div className="section">
        <div className="section-title">
          <h3>Experience</h3>
        </div>
        <div className="section-content">
                <strong>Software Developer</strong>
                <div>Worked at software Developer from Aug 2023 to Sept 2025</div>
                <div>at Banglore, India</div>
              </div>
        </div>

        <div className="section-divider" />
      <div className='section'>
        <div className="section-title">
          <h3>Education</h3>
        </div>
        <div className="section-content">
  
                {/* <div key={shortid.generate()} className="education-entry">/ */}
                  <strong>Bachelor of education</strong>
                  <div>
                    I have pursued my BE in Computer Science from VTU at Gulbarga
                  </div>
                  <p>Graduation: Aug</p>
                {/* </div> */}
              
        </div>
      </div>

        <div className="section-divider" />
      <div className='section'>
        <div className="section-title">
          <h3>Key Skills</h3>
        </div>
        <div className="section-content">
            <ul>
                <ol className="skill-item" >
                  React
                </ol>
                <ol className="skill-item" >
                  typescipt
                </ol>
                <ol className="skill-item" >
                  MongoDB
                </ol>
                <ol className="skill-item" >
                  Flask
                </ol>
            </ul>
        </div>
        </div>
      </div>
  )
}

export default Template2