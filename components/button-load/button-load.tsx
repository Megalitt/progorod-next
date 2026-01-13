import React from 'react';
import classNames from 'classnames';
import styles from './button-load.module.scss';

type Props = {
  onFilesLoad: (e: React.SyntheticEvent<EventTarget>) => void,
  className?: string,
  title?: string,
  multiple?: boolean,
  name: string,
};

const ButtonLoad: React.FC<Props> = React.memo(({
  className, onFilesLoad,
  title = 'Прикрепить фото',
  multiple = true,
  ...props
}) => (
  <>
    <div className={classNames(styles.photo, className)}>
      <input
        className={styles.btnLoad}
        type="file"
        id="files"
        multiple={multiple}
        onChange={onFilesLoad}
        {...props}
      />
      <label htmlFor="files">{title}</label>
    </div>
  </>

));

export default ButtonLoad;
