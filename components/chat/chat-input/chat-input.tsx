import React from 'react';
import styles from './chat-input.module.scss';

type Props = {
  type?: string,
  name: string,
  value: string,
  placeholder: string,
  onChange: (e: any) => void,
  onBlur: (e: any) => void,
  disabled: boolean
};

const ChatInput: React.FC<Props> = ({
  type = 'text',
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  ...props
}) => (
  <input
    className={styles.projectInput}
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={onBlur}
    value={value}
    {...props}
  />
);

export default ChatInput;
