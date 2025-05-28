import React from 'react';
import '../../styles/Popup.css';

const Popup = ({ title, contents, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup-title">{title}</h2>
        <ul className="popup-content">
          {contents.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <button className="popup-close" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Popup;
