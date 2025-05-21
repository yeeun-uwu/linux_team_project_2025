import React, { useEffect, useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data/weatherData.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>로딩 중...</div>;

  return (
    <div className="weather-wrapper">
      {/* 상단 */}
      <div className="header">
        <p className="location">📍 <strong>이화여대</strong></p>
        <h1 className="temperature">{data.temperature}°</h1>
        <div className="range">
          최고: <span className="temp-bold">{data.temp_max}°</span>&nbsp;&nbsp;
          최저: <span className="temp-bold">{data.temp_min}°</span>
        </div>
      </div>

      {/* 오늘의 준비물 */}
      <div className="checklist-card">
        <div className="checklist-title">오늘의 준비물은?</div>
        <ul className="checklist-list">
          {data.checklist.map((item, idx) => (
            <li key={idx}>✔️ {item}</li>
          ))}
        </ul>
      </div>

      {/* 날씨 팁 */}
      <p className="tip">{data.tip}</p>

      {/* 카드 그리드 */}
      <div className="card-grid">
        {/* 공구템 */}
        <div className="card item-card">
          <div className="card-label">오늘의 공구템 추천</div>
          <img src="/images/jacket.png" alt="공구템" className="card-image" />
          <p className="card-text">{data.item}</p>
        </div>

        {/* 미세먼지 */}
        <div className="card dust-card">
          <div className="card-label">미세먼지 정보</div>

          {/* PM10 */}
          <div className="dust-block">
            <img src="/images/pm10.png" alt="pm10" className="dust-img" />
            <div className="dust-info">
              <div className="dust-grade">{data.dust.pm10.grade}</div>
              <div className="dust-value">{data.dust.pm10.value}</div>
              <div className="unit">㎍/㎥</div>
            </div>
          </div>

          {/* PM25 */}
          <div className="dust-block">
            <img src="/images/pm25.png" alt="pm25" className="dust-img" />
            <div className="dust-info">
              <div className="dust-grade">{data.dust.pm25.grade}</div>
              <div className="dust-value">{data.dust.pm25.value}</div>
              <div className="unit">㎍/㎥</div>
            </div>
          </div>

          <p className="subtext">＞ 마스크 추천 제품 ＜</p>
          <p className="subtext">＞ 미세먼지 건강 정보 ＜</p>
        </div>

        {/* 강수량 */}
        <div className="card rain-card">
          <div className="card-label">강수량</div>
          <p>강수 확률 {data.rain.chance}%</p>
          <p>강수량 <strong>{data.rain.amount}mm</strong></p>
          <p className="subtext">＞ 교내 우산 대여 서비스 안내 ＜</p>
          <p className="subtext">＞ 비오는 날 위험한 길은? ＜</p>
        </div>

        {/* 자외선 */}
        <div className="card uv-card">
          <div className="card-label">자외선</div>
          <p className="emoji">{data.uv.emoji}</p>
          <p>자외선 지수 {data.uv.index} - {data.uv.level}</p>
          <p className="subtext">＞ 자외선 차단제 추천 제품 ＜</p>
          <p className="subtext">＞ 양산 추천 제품 ＜</p>
        </div>

        {/* 셔틀 */}
        <div className="card shuttle-card">
          <div className="card-label">셔틀 운행 정보</div>
          {data.shuttle.routes.map((route, idx) => (
            <p key={idx}>{route}</p>
          ))}
          <p className="subtext">{data.shuttle.note}</p>
          <p className="subtext underline">＞ {data.shuttle.link} ＜</p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="button-area">
        <button>〉 오늘의 실시간 기온 예보 확인</button>
        <button>〉 대피소 위치 확인하기</button>
      </div>
    </div>
  );
};

export default Weather;
