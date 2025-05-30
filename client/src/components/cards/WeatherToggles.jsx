import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "../../styles/WeatherToggles.css";

// WeatherToggles 컴포넌트는 실시간 기온 그래프와 대피소 리스트를 접었다 펼 수 있는 형태로 보여줌
const WeatherToggles = ({ temperature, shelter, hourlyTemperature }) => {
  const [openKeys, setOpenKeys] = useState({
    temperature: false,
    shelter: false,
  });

  // 특정 toggle 항목을 열고 닫는 함수
  const toggleSection = (key) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="weather-toggle-section">
      {/* 실시간 기온 토글*/}
      <div className="toggle-block">
        <button
          className={`toggle-header ${openKeys.temperature ? "open" : ""}`}
          onClick={() => toggleSection("temperature")}
        >
          {/* 토글 화살표 */}
          <span className="arrow">
            {openKeys.temperature ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <span>실시간 기온 예보</span>
        </button>
        {/* 토글이 열려 있으면 차트 출력 */}
        {openKeys.temperature && (
        <div className="toggle-content">
          {!hourlyTemperature || hourlyTemperature.length === 0 ? (
            <div className="error-message">시간별 온도 데이터를 불러올 수 없습니다.</div>
          ) : (
            <div className="temp-graph-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyTemperature}>
                  <XAxis dataKey="hour" />
                  <YAxis domain={[0, 30]} />
                  <Tooltip formatter={(value) => [`${value}°`, "기온"]} />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#00462A"
                    strokeWidth={3}
                    dot={{ fill: "white", stroke: "#00462A", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
      </div>

      {/* 대피소 위치 정보 토글*/}
      <div className="toggle-block">
        <button
          className={`toggle-header ${openKeys.shelter ? "open" : ""}`}
          onClick={() => toggleSection("shelter")}
        >
          {/* 토글 화살표 */}
          <span className="arrow">
            {openKeys.shelter ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <span>대피소 위치</span>
        </button>
        {/* shelter 정보가 열려 있으면 리스트로 출력 */}
        {openKeys.shelter && (
          <div className="toggle-content shelter-list">
            {shelter.map((s, i) => (
              <div key={i}>
                <b>{s.시설명}</b>: {s.주소.신주소}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherToggles;
