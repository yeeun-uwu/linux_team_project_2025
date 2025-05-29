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

const UVCard = ({ uvData, uvStandard, parasol, onPopup, sunscreen }) => {
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
