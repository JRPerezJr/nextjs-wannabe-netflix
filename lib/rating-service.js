export const runRatingService = async (favorite) => {
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
