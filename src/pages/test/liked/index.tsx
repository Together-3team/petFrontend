import MainLayout from '@/components/common/Layout/Main';

export default function LikedPage() {
  return <div>LikedPage</div>;
}

LikedPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
