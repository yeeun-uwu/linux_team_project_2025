import React from 'react';
import '../../styles/Popup.css';

const Popup = ({ title, contents, onClose }) => {
  const contentArray = contents == null
    ? []
    : Array.isArray(contents)
      ? contents
      : [contents];

  return (
    <>
      <div className="popup-overlay" onClick={onClose}></div>

      <div className="popup-floating">
        <div className="popup-header">
          <span className="popup-title">{title}</span>
          <button className="popup-close-x" onClick={onClose}>✕</button>
        </div>

        <div className="popup-content">
          {contentArray.map((item, idx) => {
            if (!item) return null; 
            return (
              <div key={idx} className="popup-mask-line">
                {React.isValidElement(item) ? item : String(item)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Popup;
