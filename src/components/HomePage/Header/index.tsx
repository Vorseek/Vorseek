import React from 'react';
import DreiPreview from 'components/HomePage/DreiPreview';
import styles from './Header.module.css';

const Header = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={styles.header}>
      <DreiPreview />
    </div>
  );
};

export default Header;
