import classNames from 'classnames/bind';
import styles from './Textarea.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const cx = classNames.bind(styles);

export default function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <>
      <textarea className={cx('textareaStyle', className)} {...rest} />
    </>
  );
}
