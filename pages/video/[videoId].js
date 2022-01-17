import { useRouter } from 'next/router';

const Video = () => {
  const router = useRouter();
  return (
    <>
      <h1>Video Page! {router.query.videoId}</h1>
    </>
  );
};

export default Video;
