import React from 'react';
import DreiPreview from 'components/HomePage/DreiPreview';
import styles from './Header.module.css';
import ArrowIcon from './ArrowIcon';

const Header = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const ScrollToContent = () => {
    const clientHeight = ref.current.getClientRects().item(0).height;
    window.scrollTo({ top: clientHeight, behavior: 'smooth' });
  };
  return (
    <div ref={ref} className={styles.header}>
      <DreiPreview />
      <button type="button" onClick={ScrollToContent} className={styles.button}>
        <ArrowIcon />
      </button>
    </div>
  );
};

export default Header;
