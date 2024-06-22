export default function getFutureDate(daysToAdd: number) {
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0'); // 일자를 2자리로 맞춤

  return `${year}.${month}.${day}`;
}
