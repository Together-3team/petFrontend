import MainLayout from '@/components/common/Layout/Main';

export default function SearchPage() {
  return <div>SearchPage</div>;
}

SearchPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
