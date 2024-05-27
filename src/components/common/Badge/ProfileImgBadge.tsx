import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ProfileImaBadge.module.scss';

interface ProfileImaBadgeProps {
  profileImage?: string;
  className?: string;
}

const cx = classNames.bind(styles);

export default function ProfileImgBadge({ profileImage = '', className }: ProfileImaBadgeProps) {
  return (
    <>
      <Image
        className={cx('profileImgStyle', className)}
        src={profileImage.length > 0 ? profileImage : '/images/defaultProfile.svg'}
        alt="프로필 이미지"
        width={30}
        height={30}
      />
    </>
  );
}
