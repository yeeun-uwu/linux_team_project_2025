import React from 'react';
import '../../styles/UVCard.css';

const getUVGradeFromStandard = (index, 기준) => {
  const ranges = 기준['기준']['자외선 지수'];

  for (const [level, condition] of Object.entries(ranges)) {
    if (condition.includes('<')) {
      const max = parseFloat(condition.replace('<', ''));
      if (index < max) return level;
    } else if (condition.includes('≤') && condition.includes('≤')) {
      const [min, max] = condition.split('≤').filter(Boolean).map(Number);
      if (index >= min && index <= max) return level;
    } else if (condition.includes('≤')) {
      const min = parseFloat(condition.replace('≤', ''));
      if (index >= min) return level;
    }
  }

  return '알 수 없음';
};

const UVCard = ({ uvData, uvStandard, parasol, onPopup }) => {
  const hasData = uvData?.response?.body?.items?.length && uvStandard?.기준?.['자외선 지수'];

  return (
    <div className="card-container">
      <div className="card-label">자외선</div>

      {!hasData ? (
        <div className="card uv-card square-card">자외선 데이터를 불러올 수 없습니다.</div>
      ) : (
        (() => {
          const item = uvData.response.body.items[0];
          const index = parseInt(item.uvIndex);
          const level = getUVGradeFromStandard(index, uvStandard);

          return (
            <div className="card uv-card square-card">
              <p className="emoji">☀️</p>
              <p>자외선 지수 {index} - {level}</p>

              <p
                className="subtext clickable"
                onClick={() => onPopup('자외선 차단제 추천 제품', [
                  '유기자차: 가볍고 흡수 빠름',
                  '무기자차: 민감 피부 적합, 백탁 있음',
                  '혼합자차: 장점 혼합된 타입'
                ])}
              >
                ＞ 자외선 차단제 추천 제품 ＜
              </p>

              <p
                className="subtext clickable"
                onClick={() =>
                  onPopup('양산 추천', parasol.map((item, index) => (
                    <div key={index} style={{
                      marginBottom: '16px',
                      padding: '16px',
                      backgroundColor: '#DEF0C5',
                      borderRadius: '20px',
                      fontFamily: 'Jua',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: 1.4 }}>{item.rank}위. {item.name}</div>
                      <div style={{ fontSize: '14px', color: '#333' }}>
                        브랜드: {item.brand} / 구성: {item.type}
                      </div>
                      <div style={{ fontSize: '15px', marginBottom: '12px' }}>가격: {item.price}</div>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            backgroundColor: '#00462A',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            textDecoration: 'none'
                          }}
                        >
                          구매하러 가기
                        </a>
                      </div>
                    </div>
                  )))
                }
              >
                ＞ 양산 추천 제품 ＜
              </p>
            </div>
          );
        })()
      )}
    </div>
  );
};

export default UVCard;
