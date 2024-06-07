import BackButton from '@/components/common/BackButton';
import HighlightTeam from '@/components/common/Team/HighlightTeam';
import Header from '@/components/common/Layout/Header';
import styles from './TeamPage.module.scss';

export default function TeamPage() {
  return (
    <div>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center>페이지 전체보기</Header.Center>
        </Header.Box>
      </Header.Root>

      <div>
        <HighlightTeam />
      </div>
    </div>
  );
}
