import MainLayout from '@/components/common/Layout/Main';

export default function MyPage() {
  return <div>LikedPage</div>;
}

MyPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
