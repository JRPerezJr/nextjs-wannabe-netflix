import videoTestData from '../data/videos.json';

const fetchFromYouTubeApi = async (url, tag) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = 'youtube.googleapis.com/youtube/v3';
  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
        ETag: tag,
        'If-None-Match': tag,
      },
    }
  );

  return await response.json();
};

const fetchCommonVideos = async (url, tag) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoTestData : await fetchFromYouTubeApi(url, tag);

    if (data?.error) {
      console.log('Youtube API error', data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;

      return {
        id,
        etag: item.etag,
        publishedAt: item.snippet.publishedAt,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.log('Something went wrong with video library', error);
    return [];
  }
};

export const getVideos = (searchQuery, etag) => {
  const SEARCH_URL = `search?part=snippet&q=${searchQuery}`;
  return fetchCommonVideos(SEARCH_URL, etag);
};

export const getPopularVideos = () => {
  const POPULAR_URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=JP`;
  const ETAG = 'TDWmEn0vMvMERIfsc4G_OvV79Ho';
  return fetchCommonVideos(POPULAR_URL, ETAG);
};

export const getYoutubeVideosById = (videoId, etag) => {
  const VIDEO_URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return fetchCommonVideos(VIDEO_URL, etag);
};
