import Image from 'next/image';
import { useState } from 'react';

import styles from './Card.module.css';

import { motion } from 'framer-motion';
import cls from 'classnames';

const Card = ({ id, imgUrl, size = 'medium', shouldScale = true }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && { whileHover: { ...scale } };

  const handleOnError = () => {
    setImgSrc(
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80'
    );
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        {...shouldHover}
      >
        <Image
          src={imgSrc}
          onError={handleOnError}
          alt="image"
          layout="fill"
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
