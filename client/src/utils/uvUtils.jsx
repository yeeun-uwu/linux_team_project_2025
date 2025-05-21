export const getUVLevel = (value) => {
  if (value <= 2) return { label: "낮음", color: "#2ecc71" };
  if (value <= 5) return { label: "보통", color: "#f1c40f" };
  if (value <= 7) return { label: "높음", color: "#e67e22" };
  if (value <= 10) return { label: "매우 높음", color: "#e74c3c" };
  return { label: "위험", color: "#8e44ad" };
};
