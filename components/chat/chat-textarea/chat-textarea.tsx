import React from 'react';
import styles from './chat-textarea.module.scss';

type Props = {
  name: string,
  value: string,
  onChange?: (e: any) => void,
  onBlur?: (e: any) => void,
  onInput?: (e: any) => void,
  onKeyDown?: (e: any) => void,
  maxLength?: string,
  disabled?: boolean,
  autoFocus?: boolean,
  placeholder?: string,
};

const ChatTextarea: React.FC<Props> = ({
  name,
  onChange,
  onBlur,
  value,
  ...props
}) => (
  // @ts-ignore
  <textarea
    className={styles.projectTextarea}
    name={name}
    onChange={onChange}
    onBlur={onBlur}
    value={value}
    {...props}
  />
);

export default ChatTextarea;
