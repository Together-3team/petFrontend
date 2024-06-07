import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import ModalPortal from '@/components/common/Modal/Portal';
import styles from './AdaptiveModal.module.scss';
import { animated } from 'react-spring';

export interface ModalProps {
  type: 'bottom' | 'share' | 'drawer';
  className?: string;
  onClose?: () => void;
  style?: any;
  bind?: any;
}

const cx = classNames.bind(styles);

export default function ModalBase({ type, className, onClose, style, bind, children }: PropsWithChildren<ModalProps>) {
  return (
    <ModalPortal>
      <div className={cx('modalBackground')} data-type={type} onClick={onClose}>
        <animated.div {...bind} style={style} className={cx('modalBase', className)} data-type={type}>
          <div className={cx('modalContent')} data-type={type}>
            {children}
          </div>
        </animated.div>
      </div>
    </ModalPortal>
  );
}
