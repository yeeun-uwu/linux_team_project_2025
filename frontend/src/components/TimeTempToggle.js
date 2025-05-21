import React from 'react';

const TimeTempToggle = ({ location, temperature }) => (
  <div className="temp-section">
    <h2>📍 {location}</h2>
    <h1>{temperature.current}°</h1>
    <p>최고: {temperature.high}° | 최저: {temperature.low}°</p>
  </div>
);

export default TimeTempToggle;
