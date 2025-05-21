import React from 'react';
import './Checklist.css';

const Checklist = ({ items }) => (
  <div className="checklist-card">
    <h3>오늘의 준비물은?</h3>
    <ul>
      {items.map((item, index) => (
        <li key={index}>✓ {item}</li>
      ))}
    </ul>
  </div>
);

export default Checklist;
