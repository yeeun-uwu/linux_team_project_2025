import React from 'react';
import '../../styles/Checklist.css';

const Checklist = ({ needs }) => {
  const checklist = [];

  if (needs.need_umbrella) {
    checklist.push('우산을 챙기세요!');
  }
  if (needs.need_sunscreen) {
    checklist.push('자외선 차단제를 바르세요!');
  }
  if (needs.need_mask) {
    checklist.push('마스크를 착용하세요!');
  }

  if (checklist.length === 0) {
    checklist.push('☀️ 날씨가 좋아요! 산책을 즐겨보세요.');
  }

  return (
    <div className="checklist">
      {checklist.map((item, idx) => (
        <p key={idx} className="check-item">{item}</p>
      ))}
    </div>
  );
};

export default Checklist;