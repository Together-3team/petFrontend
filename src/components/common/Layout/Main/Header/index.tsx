import Nav from '@/components/common/Nav';

export default function Header() {
  return (
    <header>
      <p>서비스 명</p>
      <div>
        검색 <input type="search" />
      </div>
      <Nav />
    </header>
  );
}
