import React from 'react';

const Checklist = () => {
  const items = [
    '우산을 챙기세요!',
    '자외선 차단제를 바르세요!',
    '마스크를 챙기세요!'
  ];

  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
};

export default Checklist;
