import MainLayout from '@/components/common/Layout/Main';

export default function EventsPage() {
  return <div>EventsPage</div>;
}

EventsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
