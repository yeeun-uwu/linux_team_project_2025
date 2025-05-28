import React from 'react';
import '../../styles/Popup.css';

const Popup = ({ title, contents, onClose }) => {
  return (
    <>
      <div className="popup-overlay" onClick={onClose}></div>

      <div className="popup-floating">
        <div className="popup-header">
          <span className="popup-title">{title}</span>
          <button className="popup-close-x" onClick={onClose}>✕</button>
        </div>
        <ul className="popup-content">
          {contents.map((item, idx) => (
            <li key={idx}>{typeof item === 'object' ? item.내용 : item}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Popup;
