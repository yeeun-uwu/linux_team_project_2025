import React from 'react';
import '../../styles/UVCard.css';

// 자외선기준 JSON을 기반으로 등급을 계산하는 함수
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

// UVCard 컴포넌트: 자외선 정보, 차단제/양산 추천 버튼 및 팝업 연동 포함
const UVCard = ({ uvData, uvStandard, parasol, onPopup, sunscreen }) => {
  console.log("uvData 전체 구조:", JSON.stringify(uvData, null, 2));
  console.log("uvStandard 전체 구조:", JSON.stringify(uvStandard, null, 2));

  const hasData = uvData?.body?.items?.length && uvStandard?.기준?.['자외선 지수'];

  return (
    <div className="card-container">
      <div className="card-label">자외선</div>

      {/* 자외선 데이터가 없을 때 예외 처리 */}
      {!hasData ? (
        <div className="card uv-card square-card">자외선 데이터를 불러올 수 없습니다.</div>
      ) : (
        (() => {
          const item = uvData.body.items[0];
          const index = parseInt(item.Value); 
          const level = getUVGradeFromStandard(index, uvStandard);

          return (
            <div className="card uv-card square-card">
              <p className="emoji">☀️</p>
              <p>자외선 지수 {index} - {level}</p>

              {/* 자외선 차단제 추천 버튼 (팝업 열림) */}
              <p
                className="subtext clickable"
                onClick={() =>
                  onPopup('자외선 차단제 추천 제품', sunscreen.map((item, index) => (
                    <div key={index} className="uv-popup-card">
                      <span className="uv-popup-rank">{item.rank}위</span>

                      <img
                        src={`/${item.사진}`}
                        alt={item.name}
                        className="uv-popup-img"
                      />

                      <div className="uv-popup-info">
                        <div className='text-group'>
                          <div className="brand">{item.brand}</div>
                          <div className="title">{item.name}</div>
                        </div>

                        <div className='bottom-row'>
                          <div className="price">가격: {item.price}</div>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="uv-popup-button"
                          >
                            구매하러 가기
                          </a>
                        </div>
                      </div>
                    </div>
                  )))
                }
              >
                ＞ 자외선 차단제 추천 제품 ＜
              </p>

              {/* 양산 추천 버튼 (팝업 열림) */}
              <p
                className="subtext clickable"
                onClick={() =>
                  onPopup('양산 추천 제품', parasol.map((item, index) => (
                    <div key={index} className="uv-popup-card">
                      <span className="uv-popup-rank">{item.rank}위</span>

                      <img
                        src={`/${item.사진}`}
                        alt={item.name}
                        className="uv-popup-img"
                      />

                      <div className="uv-popup-info">
                        <div className="text-group">
                          <div className="brand">{item.brand}</div>
                          <div className="title">{item.name}</div>
                        </div>

                        <div className='bottom-row'>
                          <div className="price">가격: {item.price}</div>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="uv-popup-button"
                          >
                            구매하러 가기
                          </a>
                        </div>
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
