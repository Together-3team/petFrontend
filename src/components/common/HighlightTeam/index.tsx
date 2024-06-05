import Link from 'next/link';

export default function HighlightTeam() {
  return (
    <div>
      <div>
        <p>2인 공동구매</p>
        <p>주문참여로 기다림 없이 바로 주문해보세요</p>
      </div>
      <div>공동구매 data</div>
      <Link href={'/test/team'}>참여자 전체보기</Link>
    </div>
  );
}
