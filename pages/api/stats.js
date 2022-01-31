import {
  findVideoIdByUser,
  insertStatsByUserId,
  updateStatsByUserId,
} from '../../db/hasura';
import { verifyToken } from '../../lib/utils';

export default async function stats(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(403).send({ msg: 'Serverzugriff Verboten!' });
    } else {
      const inputParams = req.method === 'POST' ? req.body : req.query;

      const { videoId } = inputParams;

      if (videoId) {
        const userId = await verifyToken(token);
        const findVideo = await findVideoIdByUser(token, userId, videoId);

        const doesStatsExist = findVideo?.length > 0;

        if (req.method === 'POST') {
          const { favorite, watched = true } = req.body;
          if (doesStatsExist) {
            const response = await updateStatsByUserId(token, {
              watched,
              userId,
              videoId,
              favorite,
            });

            res.status(200).send({ data: response });
          } else {
            const response = await insertStatsByUserId(token, {
              watched,
              userId,
              videoId,
              favorite,
            });
            res.status(200).send({ data: response });
          }
        } else {
          if (doesStatsExist) {
            res.status(200).send(findVideo);
          } else {
            res.status(404).send({ user: null, msg: 'Video not found' });
          }
        }
      }
    }
  } catch (error) {
    console.log('Error occurred /stats', error);
    res.status(500).send({ done: false, error: error?.message });
  }
}
