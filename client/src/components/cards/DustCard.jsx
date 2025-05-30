import React from 'react';
import '../../styles/DustCard.css';

function getGrade(value, 기준표, type) {
  const 기준 = 기준표["미세먼지_기준"];
  if (!Array.isArray(기준)) return { 등급: '정보 없음', 픽토그램: '' };

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
// 등급에 따른 이모지 이미지 경로 반환
function getDustImage(grade) {
  switch (grade) {
    case '좋음': return '/images/좋음.png';
    case '보통': return '/images/보통.png';
    case '나쁨': return '/images/나쁨.png';
    case '매우나쁨': return '/images/매우나쁨.png';
    default: return '/images/pm_unknown.png';
  }
}
// 수치값을 기준으로 막대 그래프 위치 계산
function getBarPosition(value) {
  const max = 120;
  const percent = Math.min(100, (value / max) * 100);
  return `${percent}%`;
}

// DustCard 컴포넌트 본체
const DustCard = ({ dustData, standard, onPopup, maskDesc, pmLinks }) => {
  const items = dustData.body.items;
  if (!items || items.length === 0) {
    return <div className="card">미세먼지 데이터를 불러올 수 없습니다.</div>;
  }

  // PM10, PM2.5 항목 추출
  const pm10Item = items.find(i => i.itemCode === 'PM10');
  const pm25Item = items.find(i => i.itemCode === 'PM25');

  const pm10 = parseInt(pm10Item?.issueVal ?? '0');
  const pm25 = parseInt(pm25Item?.issueVal ?? '0');

  // 등급 계산
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

        {/* 마스크 종류별 설명 팝업 버튼 */}
        <p
          className="subtext clickable"
          onClick={() => {
            // 내부 렌더 함수: 마스크 종류 리스트를 아코디언 형식으로 출력
            const renderMaskList = (title, list) => {
              return (
                <details className="mask-accordion" open>
                  <summary className="mask-section-label">{title}</summary>
                  {list.map((m, idx) => (
                    <div key={`${title}-${idx}`} className="mask-box">
                      <p className="mask-item-title">{m.이름}{m["입자 차단 성능"] ? ` - 입자 차단 성능 ${m["입자 차단 성능"]}%` : ''}</p>
                      <p className="mask-item-desc">{m.설명}</p>
                    </div>
                  ))}
                </details>
              );
            };

            const content = [
              renderMaskList("보건용 마스크", maskDesc["보건용 마스크"]),
              renderMaskList("일반 마스크", maskDesc["일반 마스크"])
            ];

            onPopup('마스크 종류별 설명', content);
          }}
        >
          ＞ 마스크 종류별 설명 ＜
        </p>

        {/* 미세먼지 기준 및 건강 정보 팝업 버튼 */}
        <p
          className="subtext clickable"
          onClick={() => {
            const 기준표 = standard?.["미세먼지_기준"] ?? [];
            const 건강링크 = pmLinks?.["정보"] ?? [];

            const content = (
              <div className="pm-popup-wrapper">
                <div className="pm-section-label">미세먼지 기준</div>
                {/* 각 등급별 기준표 카드 출력 */}
                <div className="pm-standard-grid">
                  {기준표.map((s, i) => (
                    <div key={i} className="pm-standard-card">
                      <div className="pm-icon-text">{s.픽토그램}</div>
                      <p className="pm-grade">{s.등급}</p>
                      <p className="pm-value">PM10: {s["PM-10(μg/m³)"]}</p>
                      <p className="pm-value">PM2.5: {s["PM-2.5(μg/m³)"]}</p>
                    </div>
                  ))}
                </div>

                {건강링크.map((l, i) => (
                  <a
                    key={`link-${i}`}
                    href={l.링크}
                    target="_blank"
                    rel="noreferrer"
                    className="pm-link-button"
                  >
                    {l.내용}
                  </a>
                ))}
              </div>
            );
            onPopup("미세먼지 건강 정보", content);
          }}
        >
          ＞ 미세먼지 건강 정보 ＜
        </p>



      </div>
    </div>
  );
};

export default DustCard;