import jwt from 'jsonwebtoken';
import {
  findVideoIdByUser,
  insertStatsByUserId,
  updateStatsByUserId,
} from '../../db/hasura';

export default async function stats(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(403).send({ msg: 'Serverzugriff Verboten!' });
      } else {
        const { videoId, favorite, watched = true } = req.body;

        if (videoId) {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          const userId = decodedToken.issuer;

          const doesStatsExist = await findVideoIdByUser(
            token,
            userId,
            videoId
          );

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
        }

        res.status(200).send({ decodedToken, findVideoId });
      }
    } catch (error) {
      console.log('Error occurred /stats', error);
      res.status(500).send({ done: false, error: error?.message });
    }
  } else {
    res.status(400).send({ msg: 'Your request failed!' });
  }
}
