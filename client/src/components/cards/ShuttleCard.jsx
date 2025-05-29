import React from 'react';
import '../../styles/ShuttleCard.css';

const ShuttleCard = ({ links }) => {
  return (
    <div className="card-container">
      <div className="card-label">셔틀 운행 정보</div>
      <div className="card shuttle-card square-card">
        <p></p>
        <p>연희행 7:50 ~ 21:00</p>
        <p>한우리행 8:25 ~ 16:05</p>
        <p>야간&nbsp;기숙사&nbsp;21:10&nbsp;~&nbsp;23:40</p>
        <p className="shuttle-note">12:00 ~ 13:00 점심시간 제외</p>
        <a
          href={links?.링크?.['셔틀버스 실시간 위치 확인'] || '#'}
          target="_blank"
          rel="noreferrer"
        >

          ＞셔틀버스 실시간 위치 확인＜
        </a>
      </div>
    </div>
  );
};

export default ShuttleCard;