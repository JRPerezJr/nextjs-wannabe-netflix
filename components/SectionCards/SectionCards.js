import Card from '../Card/Card';
import styles from './SectionCards.module.css';

const SectionCards = ({ title, size, videos }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          return <Card id={idx} imgUrl={video.imgUrl} size={size} />;
        })}
      </div>
    </section>
  );
};

export default SectionCards;