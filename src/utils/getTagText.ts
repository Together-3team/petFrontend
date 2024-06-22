export default function getTagText(status: number | undefined) {
  switch (status) {
    case 0:
      return '공동구매 대기';
    case 1:
      return '공동구매 완료';
    case 2:
      return '주문 완료';
    case 3:
      return '배송 준비';
    case 4:
      return '배송 중';
    case 5:
      return '배송 완료';
    default:
      return '취소/환불';
  }
}
