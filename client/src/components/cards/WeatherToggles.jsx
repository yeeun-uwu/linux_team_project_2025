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

const WeatherToggles = ({ temperature, shelter, hourlyTemperature }) => {
  const [openKeys, setOpenKeys] = useState({
    temperature: false,
    shelter: false,
  });

  const toggleSection = (key) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const dummyData = hourlyTemperature || Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}시`,
    temp: 8 + Math.round(10 * Math.sin(i / 3)),
  }));

  return (
    <div className="weather-toggle-section">
      {/* 실시간 기온 */}
      <div className="toggle-block">
        <button
          className={`toggle-header ${openKeys.temperature ? "open" : ""}`}
          onClick={() => toggleSection("temperature")}
        >
          <span className="arrow">
            {openKeys.temperature ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <span>실시간 기온 예보</span>
        </button>
        {openKeys.temperature && (
          <div className="toggle-content">
            <div className="temp-graph-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData}>
                  <XAxis dataKey="hour" />
                  <YAxis domain={[0, 30]} />
                  <Tooltip formatter={(value) => [`${value}°`, "기온"]} />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#00462A"
                    strokeWidth={3}
                    dot={{ fill: "white", stroke: "#00462A", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* 대피소 위치 */}
      <div className="toggle-block">
        <button
          className={`toggle-header ${openKeys.shelter ? "open" : ""}`}
          onClick={() => toggleSection("shelter")}
        >
          <span className="arrow">
            {openKeys.shelter ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <span>대피소 위치</span>
        </button>
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
