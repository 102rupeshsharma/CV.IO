import React from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import './PreviewModel.css';



function SuccessMessage(props) {

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
  
    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal, setShowModal]);
  
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-dialog" ref={modalRef}>
        <div className="custom-modal-content" role="dialog" aria-modal="true">
          <div className="custom-modal-header">
            <h5 className="custom-modal-title">
              <CheckCircleFill className="success-icon" />
              Resume Downloaded
            </h5>
          </div>
          <div className="custom-modal-body">
            <p>Your Resume has been successfully downloaded!</p>
          </div>
          <div className="custom-modal-footer">
            <button
              type="button"
              className="custom-close-button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
