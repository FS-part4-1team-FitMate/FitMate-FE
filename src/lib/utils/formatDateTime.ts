export default function formatDateTime(timestamp: string | Date) {
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const d = new Date(timestamp);

  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const day = d.getDate();

  const dayOfWeek = daysOfWeek[d.getDay()];

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0"); // 2자리로 맞추기
  const ampm = hours >= 12 ? "오후" : "오전";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${year}. ${month}. ${day}(${dayOfWeek}) ${ampm} ${hours}:${minutes}`;
}
