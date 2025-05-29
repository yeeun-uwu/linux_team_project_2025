import React from 'react';
import '../../styles/RainCard.css';

const RainCard = ({ rain, links, roadData, onPopup }) => {
  return (
    <div className="card-container">
      <div className="card-label">강수량</div>
      <div className="card rain-card square-card">
        <p>강수 확률 {rain.probability}</p>
        <p>강수량 {rain.amount}</p>
        <p></p>
        <a
          className="subtext"
          href={links?.링크?.['우산 대여 서비스'] || '#'}
          target="_blank"
          rel="noreferrer"
        >
          ＞ 우산 대여 서비스 안내 ＜
        </a>

        <p
          className="subtext clickable"
          onClick={() => {
            const roads = roadData;
            console.log("DEBUG: roads =", roads);

            if (!roads || roads.length === 0) {
              onPopup("비오는 날 위험한 길은?", "등록된 정보가 없습니다.");
              return;
            }

            const content = roads.map((road, i) => {
              console.log("ROAD ITEM:", road);
              return (
                <div key={i} className="rain-road-box">
                  <span className="road-name">{road.이름}</span>
                  <a
                    href={road.지도}
                    className="road-view-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    거리뷰
                  </a>
                </div>
              );
            });

            console.log("POPUP CONTENT:", content);
            onPopup("비오는 날 위험한 길은?", content);
          }}
        >
          ＞ 비 오는 날 위험한 길은? ＜
        </p>


      </div>
    </div>
  );
};

export default RainCard;