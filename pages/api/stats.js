export default async function stats(req, res) {
  if (req.method === 'POST') {
    try {
      if (!req.cookies.token) {
        res.status(403).send({ msg: 'Serverzugriff Verboten!' });
      } else {
        res.status(200).send({ msg: 'Works!' });
      }
    } catch (error) {
      console.log('Error occurred /stats', error);
      res.status(500).send({ done: false, error: error?.message });
    }
  } else {
    res.status(400).send({ msg: 'Your request failed!' });
  }
}
