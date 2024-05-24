import Input from '@/components/common/Input';

export default function input() {
  return (
    <>
      <Input id="" type="text" size={'large'} label=" " labelStyle={'label'} placeholder="닉네임을 입력해주세요" />
      <Input
        id=""
        type="text"
        size={'mediumLarge'}
        border={'roundBorder'}
        label=" "
        labelStyle={'label'}
        placeholder="검색어를 입력해주세요"
        imageProps={{}}
        background={'background'}
      />
      <Input
        id=""
        type="text"
        size={'medium'}
        border={'roundBorder'}
        label=" "
        labelStyle={'label'}
        placeholder="검색어를 입력해주세요"
        imageProps={{}}
        background={'background'}
      />
    </>
  );
}
