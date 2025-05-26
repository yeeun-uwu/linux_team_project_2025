import React from 'react';
import '../../styles/RainCard.css';

const RainCard = ({ rain, links, onPopup }) => {
  return (
    <div className="card-container">
      <div className="card-label">강수량</div>
      <div className="card rain-card square-card">
        <p>강수 확률 20%</p>
        <p>강수량 50mm</p>

        <a
          className="subtext"
          href={links.링크['우산 대여 서비스']}
          target="_blank"
          rel="noreferrer"
        >
          ＞ 우산 대여 서비스 안내 ＜
        </a>

        <p
          className="subtext clickable"
          onClick={() => onPopup('비오는 날 위험한 길은?', rain['빗길'].map((r, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span>{r.이름}</span>
              <a
                href={r.지도}
                target="_blank"
                rel="noreferrer"
                className="roadview-button"
              >
                거리뷰
              </a>
            </div>
          )))}
        >
          ＞ 비오는 날 위험한 길은? ＜
        </p>
      </div>
    </div>
  );
};

export default RainCard;