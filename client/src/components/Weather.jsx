import React, { useEffect, useState } from 'react';
import DustCard from './cards/DustCard';
import UVCard from './cards/UVCard';
import ItemCard from './cards/ItemCard';
import RainCard from './cards/RainCard';
import Checklist from './cards/Checklist';
import ShuttleCard from './cards/ShuttleCard';
import WeatherToggles from './cards/WeatherToggles';
import ParasolList from './cards/ParasolList';
import Popup from './cards/Popup';
import '../styles/Weather.css';

const Weather = () => {
  const [data, setData] = useState(null);
  const [tip, setTip] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [hourlyTemperature, setHourlyTemperature] = useState({});
  const [popup, setPopup] = useState({ open: false, title: '', content: null });

  const onPopup = (title, content) => {
    setPopup({ open: true, title, content });
  };

  const needs = {
    need_mask: true,
    need_sunscreen: true,
    need_umbrella: false
  };

  useEffect(() => {
    Promise.all([
      fetch('/data/미세먼지.json').then(res => res.json()),
      fetch('/data/미세먼지기준.json').then(res => res.json()),
      fetch('/data/자외선지수.json').then(res => res.json()),
      fetch('/data/자외선기준.json').then(res => res.json()),
      fetch('/data/공구템.json').then(res => res.json()),
      fetch('/data/링크.json').then(res => res.json()),
      fetch('/data/날씨별잡지식.json').then(res => res.json()),
      fetch('/data/양산.json').then(res => res.json()),
      fetch('/data/마스크설명.json').then(res => res.json()),
      fetch('/data/대피소.json').then(res => res.json()),
      fetch('/data/자외선차단제.json').then(res => res.json()),
      fetch('/data/빗길.json').then(res => res.json()),
      fetch('/data/미세먼지건강정보링크.json').then(res => res.json()),
    ]).then(([fetchedDust, fetchedDustStandard, fetchedUvData, uvStandard, items, links, tips, parasol, maskDesc, shelter, sunscreen, rawroadData, pmLinks]) => {

      // ✅ 테스트용 임시 데이터 (UI 개발용)
      const temperature = { current: 24.5, max: 28, min: 16 };
      const hourlyTemp = {
        '00': 18, '03': 17, '06': 16, '09': 20, '12': 24,
        '15': 26, '18': 25, '21': 22
      };
      const rain = { weather: '맑음', probability: '0%', amount: '0mm' };

      const testDust = {
        response: {
          body: {
            items: [
              { itemCode: 'PM10', issueVal: '40' },
              { itemCode: 'PM25', issueVal: '20' }
            ]
          }
        }
      };

      const testUv = {
        response: {
          body: {
            items: [{ uvIndex: '6' }]
          }
        }
      };

      const weather = rain.weather || '맑음';
      const tipList = tips?.['날씨별_이야기']?.[weather] || ['오늘 하루도 좋은 하루 되세요!'];
      const randomTip = tipList[Math.floor(Math.random() * tipList.length)];
      setTip(typeof randomTip === 'object' ? randomTip.내용 : randomTip);

      const minTemp = temperature.min;
      const itemArray = items["공구템"] || [];
      const 추천템 = itemArray.filter(item => {
        const [min, max] = item.온도;
        return minTemp >= min && minTemp <= max;
      });

      const roadData = rawroadData["빗길"] || [];

      setFilteredItems(추천템);

      setData({
        dust: testDust,                     //  테스트용 측정값
        dustStandard: fetchedDustStandard,  // 실제 미세먼지 기준표 유지
        uv: testUv,                         // 테스트용 UV
        uvStandard,
        rain,
        temperature,
        parasol,
        links,
        shelter,
        sunscreen,
        roadData,
        maskDesc,
        pmLinks
      });

      setHourlyTemperature(hourlyTemp);
    });
  }, []);


  if (!data) return <div>로딩 중...</div>;

  return (
    <div className="weather-wrapper">
      <div className="header">
        <p className="location">📍 이화여대</p>
        <h1 className="temperature">{data.temperature.current}°</h1>
        <p className="range">최고: {data.temperature.max}° / 최저: {data.temperature.min}°</p>
      </div>

      <div className="checklist-section">
        <div className="title-bar">오늘의 준비물은?</div>
        <Checklist needs={needs} />
      </div>

      <p className="tip">☀️ {tip}</p>

      <div className="card-layout">
        <div className="left-column">
          <ItemCard itemList={filteredItems} />
          <RainCard
            rain={data.rain}
            links={data.links}
            roadData={data.roadData}
            onPopup={onPopup}
          />
          <UVCard
            uvData={data.uv}
            uvStandard={data.uvStandard}
            parasol={data.parasol}
            sunscreen={data.sunscreen} 
            onPopup={onPopup}
          />
        </div>
        <div className="right-column">
          <DustCard
            dustData={data.dust}
            standard={data.dustStandard}
            onPopup={onPopup}
            maskDesc={data.maskDesc}
            pmLinks={data.pmLinks}
          />
          <ShuttleCard links={data.links} />
        </div>
      </div>

      {/* 토글 방식 적용 */}
      <WeatherToggles
        temperature={data.temperature}
        shelter={data.shelter}
        hourlyTemperature={[
          { hour: '00시', temp: 10 },
          { hour: '01시', temp: 9 },
          { hour: '02시', temp: 9 },
          { hour: '03시', temp: 8 },
          { hour: '04시', temp: 7 },
          { hour: '05시', temp: 7 },
          { hour: '06시', temp: 8 },
          { hour: '07시', temp: 10 },
          { hour: '08시', temp: 12 },
          { hour: '09시', temp: 14 },
          { hour: '10시', temp: 16 },
          { hour: '11시', temp: 18 },
          { hour: '12시', temp: 20 },
          { hour: '13시', temp: 21 },
          { hour: '14시', temp: 22 },
          { hour: '15시', temp: 23 },
          { hour: '16시', temp: 23 },
          { hour: '17시', temp: 22 },
          { hour: '18시', temp: 20 },
          { hour: '19시', temp: 18 },
          { hour: '20시', temp: 16 },
          { hour: '21시', temp: 14 },
          { hour: '22시', temp: 13 },
          { hour: '23시', temp: 11 },
        ]}
      />

      {popup.open && (
        <Popup
          title={popup.title}
          contents={popup.content}
          onClose={() => setPopup({ ...popup, open: false })}
        />
      )}

    </div>
  );
};

export default Weather;
