import React from 'react';
import styles from './tape.module.scss';
import { TapeItem } from '../index';

type Props = {
  dataTape: any,
  type: string,
};

const Tape: React.FC<Props> = ({ dataTape, type }) => (
  <div className={styles.tape}>
    {
      dataTape.map((item) => (
        <TapeItem type={type} {...item} />
      ))
    }
  </div>
);

export default Tape;
