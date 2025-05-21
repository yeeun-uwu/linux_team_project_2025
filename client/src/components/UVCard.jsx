import React from 'react';

const UVCard = ({ uv }) => (
  <div className="uv-card">
    <h3>자외선</h3>
    <p>자외선 지수 {uv.index} - {uv.level}</p>
  </div>
);

export default UVCard;
