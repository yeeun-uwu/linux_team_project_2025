import React, { useEffect, useState } from 'react';
import DustCard from './cards/DustCard';
import UVCard from './cards/UVCard';
import ItemCard from './cards/ItemCard';
import RainCard from './cards/RainCard';
import Checklist from './cards/Checklist';
import ShuttleCard from './cards/ShuttleCard';
import WeatherToggles from './cards/WeatherToggles';
import '../styles/Weather.css';

const Weather = () => {
  const [data, setData] = useState(null);
  const [tip, setTip] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [hourlyTemperature, setHourlyTemperature] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('/data/미세먼지기준.json').then(res => res.json()),
      fetch('/data/자외선기준.json').then(res => res.json()),
      fetch('/data/공구템.json').then(res => res.json()),
      fetch('/data/양산.json').then(res => res.json()),
      fetch('/data/날씨별잡지식.json').then(res => res.json()),
      fetch('/data/링크.json').then(res => res.json()),
      fetch('/data/대피소.json').then(res => res.json())
    ]).then(([dustStandard, uvStandard, items, parasol, tips, links, shelter]) => {
      // 임시 데이터 (실제는 백엔드에서 받아옴)
      const temperature = { current: 24.5, max: 28, min: 16 };
      const hourlyTemp = {
        '00': 18, '03': 17, '06': 16, '09': 20, '12': 24,
        '15': 26, '18': 25, '21': 22
      };
      const rain = { weather: '맑음', probability: '0%', amount: '0mm' };
      const dust = { response: { body: { items: [{ itemCode: 'PM10', issueVal: '40' }, { itemCode: 'PM25', issueVal: '20' }] } } };
      const uv = { response: { body: { items: [{ uvIndex: '6' }] } } };

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
      setFilteredItems(추천템);

      setData({ dust, dustStandard, uv, uvStandard, rain, temperature, parasol, links, shelter });
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
        <Checklist
          rain={data.rain}
          uv={data.uv}
          dust={data.dust}
          dustStandard={data.dustStandard}
          uvStandard={data.uvStandard}
        />
      </div>

      <p className="tip">☀️ {tip}</p>

      <div className="card-layout">
        <div className="left-column">
          <ItemCard itemList={filteredItems} />
          <RainCard rain={data.rain} links={data.links} />
          <UVCard uvData={data.uv} uvStandard={data.uvStandard} parasol={data.parasol} />
        </div>
        <div className="right-column">
          <DustCard dustData={data.dust} standard={data.dustStandard} />
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

    </div>
  );
};

export default Weather;
