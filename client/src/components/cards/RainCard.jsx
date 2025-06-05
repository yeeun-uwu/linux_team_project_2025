import React from 'react';
import '../../styles/RainCard.css';

// RainCard 컴포넌트: 강수 확률, 강수량, 우산 대여 링크, 위험한 길 안내 팝업을 포함한 카드
const RainCard = ({ rain, links, roadData, onPopup }) => {
  return (
    <div className="card-container">
      <div className="card-label">강수량</div>
      <div className="card rain-card square-card">
        <p>강수 확률 {rain.body.items[0].Value}</p>
        <p>강수량 {rain.body.items[1].Value}</p>
        <p></p>

        {/* 우산 대여 서비스 링크 (외부 사이트로 이동) */}
        <a
          className="subtext"
          href={links?.링크?.['우산 대여 서비스'] || '#'}
          target="_blank"
          rel="noreferrer"
        >
          ＞ 우산 대여 서비스 안내 ＜
        </a>

        {/* 위험한 길 팝업 버튼 */}
        <p
          className="subtext clickable"
          onClick={() => {
            const roads = roadData?.["빗길"];

            if (!roads || roads.length === 0) {
              onPopup("비오는 날 위험한 길은?", "등록된 정보가 없습니다.");
              return;
            }

            // roadData 배열을 순회하며 UI 요소 구성
            const content = roads.map((road, i) => {
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