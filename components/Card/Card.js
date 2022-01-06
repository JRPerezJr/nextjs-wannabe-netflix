import Image from 'next/image';
import { useState } from 'react';

import styles from './Card.module.css';

const Card = ({ imgUrl, size = 'medium' }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  return (
    <div className={styles.container}>
      <h1>Card</h1>
      <div className={classMap[size]}>
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt="large image"
          layout="fill"
          onError={() =>
            setImgSrc(
              'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80'
            )
          }
        />
      </div>
    </div>
  );
};

export default Card;
