import { useRouter } from 'next/router';

export default function EventsPage() {
  const router = useRouter();

  console.log('events: ', router);

  return (
    <>
      <div>EventsPage</div>
      <button type="button" onClick={() => router.back()}>
        뒤로가기
      </button>
    </>
  );
}
