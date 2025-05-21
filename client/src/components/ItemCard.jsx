import React from 'react';

const ItemCard = ({ item }) => (
  <div className="item-card">
    <h3>오늘의 공구템 추천</h3>
    <div className="image-box" />
    <p>{item.name}</p>
  </div>
);

export default ItemCard;
