export const getFineDustLevel = (value) => {
  if (value <= 30) return { label: "좋음", color: "#2ecc71" };
  if (value <= 80) return { label: "보통", color: "#f1c40f" };
  if (value <= 150) return { label: "나쁨", color: "#e67e22" };
  return { label: "매우 나쁨", color: "#e74c3c" };
};

export const getUltraFineDustLevel = (value) => {
  if (value <= 15) return { label: "좋음", color: "#2ecc71" };
  if (value <= 35) return { label: "보통", color: "#f1c40f" };
  if (value <= 75) return { label: "나쁨", color: "#e67e22" };
  return { label: "매우 나쁨", color: "#e74c3c" };
};
