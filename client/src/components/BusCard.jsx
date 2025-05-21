import React from 'react';

const BusCard = ({ schedule }) => (
  <div className="bus-card">
    <h3>셔틀 운행 정보</h3>
    <ul>
      <li>연합행 {schedule.연합행}</li>
      <li>한우리행 {schedule.한우리행}</li>
      <li>야간 기숙사 {schedule.야간기숙사}</li>
      <li>{schedule.점심시간제외}</li>
    </ul>
    <a href="https://www.ewha.ac.kr/ewha/intro/campus-map-bus.do" target="_blank" rel="noopener noreferrer">셔틀버스 실시간 위치 확인!</a>
  </div>
);

export default BusCard;
