import React from 'react';
import { TapeModeItem } from '../index';
import styles from './tape-mode.module.scss';
import { RowsLayout } from '../../../../layouts/rows-layout';
import { Banner } from '../../../banner';

type Props = {
  dataTape: any,
  bannersInServices?: any,
};

const TapeMode: React.FC<Props> = ({ dataTape, bannersInServices }) => (
  <div className={styles.tape}>
    <div className={styles.tapeRow}>
      {
          dataTape.data && dataTape.data.slice(0, 4).map((item) => (
            <TapeModeItem key={item.id} {...item} />
          ))
        }
      {bannersInServices && bannersInServices.length > 0 && dataTape.data && dataTape.data.slice(0, 4).length === 4 && (
        <RowsLayout>
          <Banner {...bannersInServices[0]} />
        </RowsLayout>
      )}
    </div>
    <div className={styles.tapeRow}>
      {
          dataTape.data && dataTape.data.slice(4, 8).map((item) => (
            <TapeModeItem key={item.id} {...item} />
          ))
        }
      {bannersInServices && bannersInServices.length > 0 && dataTape.data && dataTape.data.slice(4, 8).length === 4 && (
        <RowsLayout>
          <Banner {...bannersInServices[1]} />
        </RowsLayout>
      )}
    </div>
    <div className={styles.tapeRow}>
      {
          dataTape.data && dataTape.data.slice(8, 12).map((item) => (
            <TapeModeItem key={item.id} {...item} />
          ))
        }
    </div>
  </div>
);

export default TapeMode;
