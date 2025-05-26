import React from 'react';

const ShelterButton = ({ shelters }) => {
  const onClick = () => {
    alert(shelters.map(s => `${s.시설명}: ${s.주소.신주소}`).join('\n'));
  };

  return (
    <div className="card">
      <button onClick={onClick}>대피소 위치 확인하기</button>
    </div>
  );
};

export default ShelterButton;
