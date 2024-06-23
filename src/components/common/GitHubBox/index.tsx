import Image from 'next/image';
import styles from './GitHubBox.module.scss';

import githubIcon from '@/assets/images/github.png';

export default function GitHubBox() {
  return (
    <a href="https://github.com/orgs/Together-3team" className={styles.container} target="_blank">
      <span className={styles.logoText}>포잉마켓</span>
      <span className={styles.teamText}>코드잇 스프린트 4기 3팀</span>
      <Image className={styles.github} src={githubIcon.src} width={20} height={20} alt="github 아이콘" />
    </a>
  );
}
