import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Modal from 'react-modal';

import styles from '../../styles/Video.module.css';

import cls from 'classnames';
import { getYoutubeVideosById } from '../../lib/videos';

import Navbar from '../../components/Nav/Navbar';
import Footer from '../../components/Footer/Footer';
import Like from '../../components/Icons/LikeIcon';
import Dislike from '../../components/Icons/DislikeIcon';
import { fetchRatingService, runRatingService } from '../../lib/rating-service';

Modal.setAppElement('#__next');

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const etag = context.params.etag;
  // video id and etag
  const videoArray = await getYoutubeVideosById(videoId, etag);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },

    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: 'blocking' };
}

const Video = ({ video }) => {
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const router = useRouter();

  const videoId = router.query.videoId;

  const {
    title,
    publishedAt,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  useEffect(async () => {
    const response = await fetchRatingService(videoId);
    const data = await response.json();

    if (data.length > 0) {
      const favorite = data[0].favorite;
      if (favorite === 1) {
        setToggleLike(true);
      } else if (favorite === 0) {
        setToggleDislike(true);
      }
    }
  }, []);

  const published = new Date(publishedAt);
  const formatterUS = new Intl.NumberFormat('en-US');

  const handleToggleLike = async () => {
    const val = !toggleLike;

    setToggleLike(val);
    setToggleDislike(toggleLike);

    const favorite = val ? 1 : 0;

    const response = await runRatingService(videoId, favorite);
  };

  const handleToggleDislike = async () => {
    const val = !toggleDislike;

    setToggleDislike(!toggleDislike);
    setToggleLike(toggleDislike);

    const favorite = val ? 0 : 1;

    const response = await runRatingService(videoId, favorite);
  };

  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Wannabe Netflix` : 'Wannabe Netflix'}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <div className={styles.container}>
        <Navbar />
        <Modal
          className={styles.modal}
          isOpen={true}
          contentLabel="Watch Mojo"
          onRequestClose={() => router.back()}
          overlayClassName={styles.overlay}
        >
          <iframe
            className={styles.videoPlayer}
            id="ytplayer"
            type="text/html"
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&rel=1`}
            frameBorder="0"
          />

          <div className={styles.likeDislikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
              <button onClick={handleToggleLike}>
                <div className={styles.btnWrapper}>
                  <Like selected={toggleLike} />
                </div>
              </button>
            </div>

            <button onClick={handleToggleDislike}>
              <div className={styles.btnWrapper}>
                <Dislike selected={toggleDislike} />
              </div>
            </button>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.col1}>
                <p className={styles.publishTime}>
                  {published.toLocaleDateString()}
                </p>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
              </div>
              <div className={styles.col2}>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>From: </span>
                  <span className={styles.channelTitle}>{channelTitle}</span>
                </p>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>View Count: </span>
                  <span className={styles.channelTitle}>
                    {formatterUS.format(viewCount)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </Modal>
      </div>
    </>
  );
};

export default Video;
