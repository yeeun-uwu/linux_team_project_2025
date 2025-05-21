import React from 'react';
import './DustCard.css';

const DustBar = ({ value, color }) => (
  <div className="dust-bar">
    <div className="dust-bar-track" />
    <div
      className="dust-bar-indicator"
      style={{ left: `${value > 100 ? 100 : value}%`, backgroundColor: color }}
    />
  </div>
);

const DustCard = ({ dust }) => (
  <div className="dust-card">
    <h3>미세먼지 정보</h3>

    <div className="dust-section">
      <div className="dust-block">
        <p className="label">미세먼지</p>
        <div className="value-row">
          <span className="level">{dust.pm10.grade}</span>
          <span className="value">{dust.pm10.value} µg/m³</span>
        </div>
        <DustBar value={dust.pm10.value} color="#B62A2A" />
      </div>

      <div className="dust-block">
        <p className="label">초미세먼지</p>
        <div className="value-row">
          <span className="level">{dust.pm25.grade}</span>
          <span className="value">{dust.pm25.value} µg/m³</span>
        </div>
        <DustBar value={dust.pm25.value} color="#568D4E" />
      </div>
    </div>
  </div>
);

export default DustCard;
