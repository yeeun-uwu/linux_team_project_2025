import React from 'react';

const ParasolList = ({ items }) => (
  <div className="card">
    <h3>양산 추천</h3>
    <ul>
      {items.slice(0, 3).map((i, idx) => (
        <li key={idx}><a href={i.link}>{i.name} - {i.price}</a></li>
      ))}
    </ul>
  </div>
);

export default ParasolList;