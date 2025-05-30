import React from 'react';
import '../../styles/ItemCard.css';

// ItemCard 컴포넌트: 기온에 따라 추천되는 의류 아이템을 보여주고, 전체 공구템 팝업도 제공
const ItemCard = ({ itemList, allItems, onPopup }) => {
  // 추천 아이템 리스트에서 첫 번째 아이템만 사용
  const item = itemList?.[0];

  // 팝업 열기 함수: 전체 공구템 목록을 보여주는 팝업 구성
  const handlePopup = () => {
    if (!allItems) return;

    onPopup(
      '기온별 공구템 가이드',
      <div className="item-popup-wrapper">
        <div className="item-section-title">공구템 두께 비교</div>
        <div className="item-subtitle">
          바람막이 &lt; 0온스 &lt; 2온스 &lt; 후리스 / 4온스 / 돕바 &lt; 주경바막
        </div>

        {/* 전체 공구템을 그리드로 나열 */}
        <div className="item-popup-grid">
          {allItems.map((item, idx) => (
            <div key={idx} className="item-popup-block">
              <img src={`/images/${item.이미지}`} alt={item.이름} className="item-popup-img" />
              <div className="item-popup-label">{item.이름}</div>
              <div className="item-popup-temp">
                추천 기온: {Array.isArray(item.온도) ? item.온도.join(' ~ ') : item.온도}도
              </div>
              {item.두께 && <div className="item-popup-thick">두께: {item.두께}</div>}
            </div>
          ))}

          {/* 체감 온도 카드 */}
          <div className="item-popup-block">
            <div className="item-popup-label">체감 온도는 실제 날씨보다 더 춥거나 더울 수 있어요</div>
            <div className="item-popup-thick">항상 내 체감을 믿으세요!</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card-container">
      <div className="card-label">오늘의 공구템 추천</div>
      <div className="card item-card square-card">
        {/* 추천 아이템이 있을 경우 이미지와 이름 표시 */}
        {item ? (
          <>
            <img src={`/images/${item.이미지}`} alt={item.이름} className="card-image" />
            <p className="card-text clickable" onClick={handlePopup}>
              {item.이름}
            </p>
          </>
        ) : (

          // 추천할 아이템이 없을 경우 텍스트 메시지 표시 + 전체 보기 버튼 제공
          <>
            <p className="card-text">
              🌞 날씨가 따뜻해요!
              <br />
              추천할 아우터 공구템이 없습니다.
            </p>
            <p className="subtext clickable" onClick={handlePopup}>
              ＞ 전체 공구템 보기 ＜
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
