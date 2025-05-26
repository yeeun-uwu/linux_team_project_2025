// Weather.jsx - 이화여대 위치 수정: 기온 바로 위로
import React, { useEffect, useState } from 'react';
import DustCard from './cards/DustCard';
import UVCard from './cards/UVCard';
import ItemCard from './cards/ItemCard';
import RainCard from './cards/RainCard';
import Checklist from './cards/Checklist';
import ShuttleCard from './cards/ShuttleCard';
import Popup from './cards/Popup';
import '../styles/Weather.css';

const Weather = () => {
  const [data, setData] = useState(null);
  const [popup, setPopup] = useState({ visible: false, title: '', contents: [] });

  const openPopup = (title, contents) => {
    setPopup({ visible: true, title, contents });
  };

  const closePopup = () => {
    setPopup({ ...popup, visible: false });
  };

  useEffect(() => {
    Promise.all([
      fetch('/data/미세먼지.json').then(res => res.json()),
      fetch('/data/미세먼지기준.json').then(res => res.json()),
      fetch('/data/자외선지수.json').then(res => res.json()),
      fetch('/data/자외선기준.json').then(res => res.json()), // ✅ 추가
      fetch('/data/공구템.json').then(res => res.json()),
      fetch('/data/양산.json').then(res => res.json()),
      fetch('/data/빗길.json').then(res => res.json()),
      fetch('/data/대피소.json').then(res => res.json()),
      fetch('/data/링크.json').then(res => res.json())
    ]).then(([dust, dustStandard, uv, uvStandard, items, parasol, rain, shelter, links]) => {
      setData({ dust, dustStandard, uv, uvStandard, items, parasol, rain, shelter, links });
    });
  }, []);

  if (!data) return <div>로딩 중...</div>;

  return (
    <div className="weather-wrapper">
      {/* 현재 날씨 헤더 */}
      <div className="header">
        <p className="location">📍 이화여대</p>
        <h1 className="temperature">16°</h1>
        <p className="range">최고: 24° / 최저: 12°</p>
      </div>

      {/* 준비물 안내 */}
      <div className="checklist-section">
        <div className="title-bar">오늘의 준비물은?</div>
        <Checklist />
      </div>

      <p className="tip">☔ 비가 오는 날에는 해물파전을 먹어보면 어떨까요?</p>

      <div className="card-layout">
        <div className="left-column">
          <ItemCard itemList={data.items} />
          <RainCard rain={data.rain} links={data.links} onPopup={openPopup} />
          <UVCard
            uvData={data.uv}
            uvStandard={data.uvStandard}
            parasol={data.parasol}
            onPopup={openPopup}
          />
        </div>
        <div className="right-column">
          <DustCard dustData={data.dust} standard={data.dustStandard} onPopup={openPopup} />
          <ShuttleCard links={data.links} />
        </div>
      </div>

      <div className="button-area">
        <button onClick={() => openPopup('실시간 기온 예보', ['오늘 낮 24도 / 밤 12도'])}>〉 오늘의 실시간 기온 예보 확인</button>
        <button onClick={() => openPopup('대피소 위치', data.shelter.map(s => `${s.시설명}: ${s.주소.신주소}`))}>〉 대피소 위치 확인하기</button>
      </div>

      {popup.visible && (
        <Popup title={popup.title} contents={popup.contents} onClose={closePopup} />
      )}
    </div>
  );
};

export default Weather;
