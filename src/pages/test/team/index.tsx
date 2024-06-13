import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import TeamDataCard from '@/components/common/Team/TeamDataCard';
import styles from './TeamPage.module.scss';

export default function TeamPage() {
  const testData = [
    {
      id: 1,
      status: '진행중',
      creator: '해피사랑',
      createdAt: '2024-06-01T10:00:00Z',
      participants: [{ name: '해피사랑', joinedAt: '2024-06-01T10:00:00Z' }],
    },
    {
      id: 2,
      status: '완료',
      creator: '뽀수니',
      createdAt: '2024-05-20T14:30:00Z',
      participants: [
        { name: '뽀수니', joinedAt: '2024-05-20T14:30:00Z' },
        { name: '춘배', joinedAt: '2024-05-22T09:45:00Z' },
      ],
    },
    {
      id: 3,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
    {
      id: 4,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
    {
      id: 5,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
    {
      id: 6,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
    {
      id: 7,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
    {
      id: 8,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
    {
      id: 9,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
    {
      id: 10,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
  ];

  return (
    <div className={styles.teamPageLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center className={styles.pageTitle}>페이지 전체보기</Header.Center>
        </Header.Box>
      </Header.Root>
      <div>
        {testData.map(data => (
          <TeamDataCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}
