import React from 'react';
import { useField } from 'formik';

import classNames from 'classnames';
import styles from './project-checkbox.module.scss';

type Props = {
  name: string,
  className?: string,
};

const ProjectCheckbox: React.FC<Props> = React.memo(({ children, className, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className={classNames(styles.wrap, className, { [styles.error]: meta.touched && meta.error })}>
      <input type="checkbox" {...field} {...props} className={styles.chb} id={props.name} />
      <label htmlFor={props.name}>
        {children}
      </label>
      {meta.touched && meta.error
        ? <span>{meta.error}</span>
        : null}
    </div>
  );
});

export default ProjectCheckbox;
