import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from '../../../lib/auth/createJwt';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if ("username" in req.headers && "password" in req.headers) {
    //Authenticate user
    await sign().then(jwt => {

      res.statusCode = 200;
      res.send({ token: jwt })
    })
  } else {

    res.statusCode = 400;
    res.json({ message: "Missing required headers to process request" });
  }
};
