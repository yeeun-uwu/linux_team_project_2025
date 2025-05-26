import React from 'react';
import '../../styles/DustCard.css';

function getGrade(value, 기준표, type) {
  const 기준 = 기준표["미세먼지_기준"];
  for (const g of 기준) {
    const range = g[type];
    if (range?.includes('~')) {
      const [min, max] = range.split('~').map(Number);
      if (value >= min && value <= max) return g;
    } else if (range?.includes('초과')) {
      const [min] = range.split(' ')[0].split('초과').map(Number);
      if (value > min) return g;
    }
  }
  return { 등급: '정보 없음', 픽토그램: '' };
}

function getDustImage(grade) {
  switch (grade) {
    case '좋음': return '/images/pm_good.png';
    case '보통': return '/images/pm_normal.png';
    case '나쁨': return '/images/pm_bad.png';
    default: return '/images/pm_unknown.png';
  }
}

function getBarPosition(value) {
  const max = 150;
  const percent = Math.min(100, (value / max) * 100);
  return `${percent}%`;
}

const DustCard = ({ dustData, standard, onPopup }) => {
  const items = dustData?.response?.body?.items;
  if (!items || items.length === 0) {
    return <div className="card">미세먼지 데이터를 불러올 수 없습니다.</div>;
  }

  const pm10Item = items.find(i => i.itemCode === 'PM10');
  const pm25Item = items.find(i => i.itemCode === 'PM25' || i.itemCode === 'PM2.5');

  const pm10 = parseInt(pm10Item?.issueVal ?? '0');
  const pm25 = parseInt(pm25Item?.issueVal ?? '0');

  const grade10 = getGrade(pm10, standard, 'PM-10(μg/m³)');
  const grade25 = getGrade(pm25, standard, 'PM-2.5(μg/m³)');

  return (
    <div className="card-container">
      <div className="card-label">미세먼지 정보</div>
      <div className="card dust-card tall-card compact">

        {/* PM10 */}
        <div className="dust-section">
          <p className="label">미세먼지</p>
          <div className="dust-row">
            <img src={getDustImage(grade10.등급)} alt={grade10.등급} className="dust-img" />
            <div className="dust-info">
              <p className="dust-grade">{grade10.등급} {grade10.픽토그램}</p>
              <p className="dust-value">
                <span className="dust-number">{pm10}</span>
                <span className="dust-unit">㎍/㎥</span>
              </p>
            </div>
          </div>
          <div className="dust-bar">
            <div className="dust-bar-fill" style={{ left: getBarPosition(pm10) }}></div>
          </div>
        </div>

        {/* PM2.5 */}
        <div className="dust-section">
          <p className="label">초미세먼지</p>
          <div className="dust-row">
            <img src={getDustImage(grade25.등급)} alt={grade25.등급} className="dust-img" />
            <div className="dust-info">
              <p className="dust-grade">{grade25.등급} {grade25.픽토그램}</p>
              <p className="dust-value">
                <span className="dust-number">{pm25}</span>
                <span className="dust-unit">㎍/㎥</span>
              </p>
            </div>
          </div>
          <div className="dust-bar">
            <div className="dust-bar-fill" style={{ left: getBarPosition(pm25) }}></div>
          </div>
        </div>

        <p
          className="subtext clickable"
          onClick={() => onPopup('마스크 추천 제품', ['KF94 마스크', '일회용 방역마스크'])}
        >＞ 마스크 추천 제품 ＜</p>

        <p
          className="subtext clickable"
          onClick={() => onPopup('미세먼지 건강 정보', ['야외 활동 자제', '실내 공기 환기'])}
        >＞ 미세먼지 건강 정보 ＜</p>
      </div>
    </div>
  );
};

export default DustCard;