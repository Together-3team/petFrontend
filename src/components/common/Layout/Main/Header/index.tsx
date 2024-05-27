import NavTop from '@/components/common/Nav/Top';

export default function MainHeader() {
  return (
    <header>
      <p>서비스 명</p>
      <div>
        검색 <input type="search" />
      </div>
      <NavTop />
    </header>
  );
}
