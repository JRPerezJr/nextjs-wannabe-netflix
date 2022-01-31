import Link from 'next/link';
import cls from 'classnames';
import Card from '../Card/Card';
import styles from './SectionCards.module.css';

const SectionCards = ({
  title,
  size,
  videos = [],
  shouldWrap = false,
  shouldScale,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video) => {
          return (
            <Link key={video.id} href={`/video/${video.id}`}>
              <a>
                <Card
                  id={video.id}
                  imgUrl={video.imgUrl}
                  size={size}
                  shouldScale={shouldScale}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
