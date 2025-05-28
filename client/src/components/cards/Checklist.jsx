import React from 'react';
import '../../styles/Checklist.css';

const Checklist = ({ rain, uv, dust, dustStandard, uvStandard }) => {
  const checklist = [];

  // 강수 확률 기준 30% 이상이면 우산 추천
  if (parseInt(rain.probability) >= 30) {
    checklist.push('우산을 챙기세요!');
  }

  // 자외선 지수가 기준보다 높으면 자외선 차단제 추천
  const uvIndex = parseInt(uv.response.body.items[0].uvIndex);
  const uvLevel = Object.entries(uvStandard["기준"]["자외선 지수"]).find(([level, range]) => {
    if (range.includes('≤')) return uvIndex >= parseInt(range.split('≤')[0]);
    if (range.includes('<')) return uvIndex < parseInt(range.replace('<', ''));
    return false;
  })?.[0];
  if (['높음', '매우 높음', '위험'].includes(uvLevel)) {
    checklist.push('자외선 차단제를 바르세요!');
  }

  // 미세먼지(PM10, PM2.5) 둘 중 하나라도 보통 이상이면 마스크 추천
  const pm10 = parseInt(dust.response.body.items.find(i => i.itemCode === 'PM10')?.issueVal || 0);
  const pm25 = parseInt(dust.response.body.items.find(i => i.itemCode === 'PM25')?.issueVal || 0);
  const getGrade = (value, type) => {
    const 기준 = dustStandard["미세먼지_기준"];
    for (const g of 기준) {
      const range = g[type];
      if (range.includes('~')) {
        const [min, max] = range.split('~').map(Number);
        if (value >= min && value <= max) return g.등급;
      } else if (range.includes('초과')) {
        const min = parseInt(range.split(' ')[0]);
        if (value > min) return g.등급;
      }
    }
    return '점검중';
  };
  const pm10Grade = getGrade(pm10, 'PM-10(μg/m³)');
  const pm25Grade = getGrade(pm25, 'PM-2.5(μg/m³)');
  if (['보통', '나쁨', '매우나쁨'].includes(pm10Grade) || ['보통', '나쁨', '매우나쁨'].includes(pm25Grade)) {
    checklist.push('마스크를 착용하세요!');
  }

  // 조건에 맞는 항목이 하나도 없으면
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
