import Link from 'next/link';

import Card from '../Card/Card';
import styles from './SectionCards.module.css';

const SectionCards = ({ title, size, videos = [] }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video) => {
          return (
            <Link key={video.id} href={`/video/${video.id}`}>
              <a>
                <Card id={video.id} imgUrl={video.imgUrl} size={size} />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
