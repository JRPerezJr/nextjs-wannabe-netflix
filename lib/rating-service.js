export const runRatingService = async (favorite, videoId) => {
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
