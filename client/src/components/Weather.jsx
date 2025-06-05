import React, { useEffect, useState } from 'react';
import DustCard from './cards/DustCard';
import UVCard from './cards/UVCard';
import ItemCard from './cards/ItemCard';
import RainCard from './cards/RainCard';
import Checklist from './cards/Checklist';
import ShuttleCard from './cards/ShuttleCard';
import WeatherToggles from './cards/WeatherToggles';
import Popup from './cards/Popup';
import '../styles/Weather.css';

const Weather = () => {
  const [data, setData] = useState(null);
  const [tip, setTip] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [popup, setPopup] = useState({ open: false, title: '', content: null });
  const [needs, setNeeds] = useState({ need_mask: true, need_sunscreen: true, need_umbrella: false });
  const [hourlyTemperature, setHourlyTemperature] = useState([]);

  const onPopup = (title, content) => {
    setPopup({ open: true, title, content });
  };

  useEffect(() => {

    Promise.all([
      fetch('/api/current/dust').then(res => res.json()),
      fetch('/data/미세먼지기준.json').then(res => res.json()),
      fetch('/api/current/uv').then(res => res.json()),
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
      fetch('/api/current/max-min-temp').then(res => res.json()),
      fetch('/api/today/need').then(res => res.json()),
      fetch('/api/current/temp').then(res => res.json()),
      fetch('/api/current/sky').then(res => res.json()),
      fetch('/api/current/rain').then(res => res.json()),
      fetch('/api/today/temp-forecast').then(res => res.json()),
    ]).then(([dust, dustStandard, uv, uvStandard, items, links, tips, parasol, maskDesc, shelter, sunscreen, roadData, pmLinks, tempInfo, needsInfo, nowTemp, nowWeather, nowRain, hourlytemp]) => {
      setHourlyTemperature(hourlytemp.body.items[0].forecast.map(item => ({ hour: item.hour, temp: item.temp })));

      const temperature = {
        current: nowTemp.body.items[0].temperature,
        max: tempInfo.body.items[1].Value,
        min: tempInfo.body.items[0].Value
      };

      const minTemp = temperature.min;
      const itemArray = items?.["공구템"] || [];
      const 추천템 = itemArray.filter(item => {
        const [min, max] = item.온도;
        return minTemp >= min && minTemp <= max;
      });

      const weather = nowWeather.body.items[0].Value; // API로 연동 시 대체
      const tipList = tips?.['날씨별_이야기']?.[weather] || ['오늘 하루도 좋은 하루 되세요!'];
      const randomTip = tipList[Math.floor(Math.random() * tipList.length)];

      setTip(typeof randomTip === 'object' ? randomTip.내용 : randomTip);
      setFilteredItems(추천템);
      setAllItems(itemArray);
      setNeeds(needsInfo.body.items[0]); // ← 백엔드에서 받은 데이터로 설정
      setData({ dust, dustStandard, uv, uvStandard, nowRain, temperature, parasol, links, shelter, sunscreen, roadData, maskDesc, pmLinks });
    });

    /*
    // 임시 데이터 시작 (백엔드 연동 시 삭제)
    Promise.all([
.then(([fetchedDust, fetchedDustStandard, fetchedUvData, uvStandard, items, links, tips, parasol, maskDesc, shelter, sunscreen, rawroadData, pmLinks]) => {
      const temperature = { current: 24.5, max: 28, min: 24 };
      setHourlyTemperature([
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
      ]);

      setData({
        dust: testDust,
        dustStandard: fetchedDustStandard,
        uv: testUv,
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
    });
    // ❌ 임시 데이터 끝
    */

  }, []);

  if (!data) return <div>로딩 중...</div>;
  console.log(hourlyTemperature)
  return (
    <div className="weather-wrapper">
      <div className="header">
        <p className="location">📍이화여대</p>
        <h1 className="temperature">{data.temperature.current}°</h1>
        <p className="range">최고: {data.temperature.max}° / 최저: {data.temperature.min}°</p>
      </div>

      <div className="checklist-section">
        <div className="title-bar">오늘의 준비물은?</div>
        <Checklist needs={needs} />
      </div>

      <p className="tip">{tip}</p>

      <div className="card-wrapper">
        <div className="card-column left">
          <ItemCard itemList={filteredItems} allItems={allItems} onPopup={onPopup} />
          <RainCard rain={data.nowRain} links={data.links} roadData={data.roadData} onPopup={onPopup} />
          <UVCard uvData={data.uv} uvStandard={data.uvStandard} parasol={data.parasol} sunscreen={data.sunscreen} onPopup={onPopup} />
        </div>
        <div className="card-column right">
          <DustCard dustData={data.dust} standard={data.dustStandard} onPopup={onPopup} maskDesc={data.maskDesc} pmLinks={data.pmLinks} />
          <ShuttleCard links={data.links} />
        </div>

        <WeatherToggles temperature={data.temperature} shelter={data.shelter} hourlyTemperature={hourlyTemperature} />
      </div>

      {popup.open && (
        <Popup title={popup.title} contents={popup.content} onClose={() => setPopup({ ...popup, open: false })} />
      )}
    </div>
  );
};

export default Weather;
