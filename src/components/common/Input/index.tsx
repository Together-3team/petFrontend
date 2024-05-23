import classNames from 'classnames/bind';
import InputLayout from './InputLayout';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export default function Input() {
  return (
    <>
      <InputLayout id="" type="text" size={cx('')} label=" " labelStyle={cx('')} placeholder="" />
    </>
  );
}

{
  /* 사용법
  1. 닉네임 인풋
      <InputLayout
        id=""
        type="text"
        size={cx('large')}
        label=" "
        labelStyle={cx('label')}
        placeholder="닉네임을 입력해주세요"
      />
  2.  사이즈 큰 검색 인풋
      <InputLayout
        id=""
        type="text"
        size={cx('mediumLarge')}
        border={cx('roundBorder')}
        label=" "
        labelStyle={cx('label')}
        placeholder="검색어를 입력해주세요"
        imageProps={{}}
        background={cx('background')}
      />
  3. 사이즈 작은 검색 인풋
      <InputLayout
        id=""
        type="text"
        size={cx('medium')}
        border={cx('roundBorder')}
        label=" "
        labelStyle={cx('label')}
        placeholder="검색어를 입력해주세요"
        imageProps={{}}
        background={cx('background')}
      /> */
}
