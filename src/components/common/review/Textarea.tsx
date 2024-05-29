import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Textarea.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const cx = classNames.bind(styles);

export default function Textarea({ className, ...rest }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (textarea: HTMLTextAreaElement, disabled: boolean) => {
    if (disabled) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current, !!rest.disabled);
    }
  }, [rest.disabled]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight(event.target, !!rest.disabled);
  };

  return (
    <>
      <textarea className={cx('textareaStyle', className)} {...rest} ref={textareaRef} onInput={handleInput} />
    </>
  );
}
