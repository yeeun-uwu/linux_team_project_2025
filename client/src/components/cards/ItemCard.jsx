import React from 'react';
import '../../styles/ItemCard.css';

const ItemCard = ({ itemList }) => {
  const item = itemList["공구템"].find(i => i.이름 === '바람막이');

  return (
    <div className="card-container">
      <div className="card-label">오늘의 공구템 추천</div>
      <div className="card item-card square-card">
        <img src={`/images/${item.이미지}`} alt={item.이름} className="card-image" />
        <p className="card-text">{item.이름}</p>
      </div>
    </div>
  );
};

export default ItemCard;