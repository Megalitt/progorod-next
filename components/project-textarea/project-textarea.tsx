import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

import styles from './project-textarea.module.scss';

type Props = {
  placeholder: string,
  name: string,
  className?: string,
};

const ProjectTextarea: React.FC<Props> = React.memo(({ className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={classNames(styles.wrap, className, { [styles.error]: meta.touched && meta.error })}>
      <textarea {...field} {...props} className={styles.field} />
      {meta.touched && meta.error
        ? <span>{meta.error}</span>
        : null}
    </div>
  );
});

export default ProjectTextarea;
