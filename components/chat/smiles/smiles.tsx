import React from 'react';
import dynamic from 'next/dynamic';
import 'emoji-mart/css/emoji-mart.css';
import styles from './smiles.module.scss';

const Picker:any = dynamic(
  () => import('emoji-mart').then((mod) => mod.Picker),
);

type Props = {
  handleSmileSelected: (native: any) => void,
  handleSmileWindowToggle: (native: any) => void,
};

const Smiles: React.FC<Props> = ({ handleSmileWindowToggle, handleSmileSelected }) => (
  <>
    <div className={styles.smilesWrap} onClick={handleSmileWindowToggle} />
    <Picker
      set="apple"
      title=""
      showPreview={false}
      showSkinTones={false}
      style={{
        width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      }}
      onSelect={(emoji) => handleSmileSelected(emoji.native)}
    />
  </>
);

export default Smiles;
