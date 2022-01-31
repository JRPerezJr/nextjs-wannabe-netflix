export const runRatingService = async (videoId, favorite) => {
  return await fetch('/api/stats', {
    method: 'POST',
    body: JSON.stringify({
      videoId,
      favorite,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const fetchRatingService = async (videoId) => {
  return await fetch(`/api/stats?videoId=${videoId}`, {
    method: 'GET',
  });
};
