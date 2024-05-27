import ImageBox from '@/components/common/ImageBox';

export default function imageBox() {
  return (
    <>
      <ImageBox size={'my'} src="/images/search.svg" alt="검색 아이콘" disabled />
      <ImageBox size={'my'} src="/images/search.svg" alt="검색 아이콘" />
    </>
  );
}
