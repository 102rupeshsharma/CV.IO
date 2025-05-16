import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import custom CSS

export const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="custom-navbar">
        <div className="navbar-brand">
          <span className="logo-blue">CV.</span>
          <span className="logo-dark">IO</span>
        </div>

        <div className="navbar-links">
          <Link to="/myresume" className="nav-link">My Resume</Link>
          <Link to="/about" className="nav-link">About Us</Link>
        </div>
      </nav>
    </div>
  );
};


// import React from 'react'
// import {FileEarmarkTextFill} from 'react-bootstrap-icons'
// import {Link} from 'react-router-dom'

// export const Navbar = () => {
//     return(
      
//         <div style={{color:'#07588a', borderRadius:'10px', margin:'15px 80px 0 80px'}}>
//             <nav className="navbar navbar-expand-lg navbar-light p-0 m-0 " >
//                 <div className="container-fluid  ">

//                   <div className="navbar-brand d-flex align-items-center" style={{color:'#07588a',fontSize:'30px', fontWeight:"600"}}>
//                     <div className='me-3 mb-2'><FileEarmarkTextFill/></div>
//                     <span style={{color:'#005ce6',fontSize:'50px'}}>CV.</span><span style={{color:'#333333',fontSize:'50px'}}>IO</span>
//                   </div>

//                   <div className="collapse navbar-collapse  " id="navbarSupportedContent">
//                     <div className='flex-grow-1'></div>
//                     <div className="navbar-nav mb-2 ms-5 ">
//                       <li className="nav-item">
//                         <Link to='/myresume' className="nav-link active me-4" style={{textDecoration:'none',color:'#07588a',fontSize:"20px"}} >My Resume</Link>
//                       </li>
//                       <li className="nav-item">
//                         <Link to='/about' className="nav-link active " style={{textDecoration:'none',color:'#07588a',fontSize:"20px"}}>About Us</Link>
//                       </li>
//                     </div>
//                   </div>
//                 </div>
//             </nav>  
//         </div>
//     )
// }

