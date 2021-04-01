import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from '@lib/auth/createJwt';
import { querySingle } from '@lib/db';
import { createHash } from 'crypto';
import { Customer } from '@lib/models/customers';
import { verify } from '@lib/auth/verifyJwt';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if ('refresh_token' in req.headers) {
    //Query database for password
    try {
      const verifyRes = await verify(req.headers['refresh_token'] as string);

      if (verifyRes) {

        const refresh = JSON.parse(verifyRes.payload.toString());

        const dateNow = Math.floor(Date.now() / 1000);

        if (refresh.exp <= dateNow) {
          return res.status(401).json({ error: 'Expired refresh_token provided to api.' });
        }

        const user = await querySingle<Customer>("SELECT * FROM customers WHERE cid = ?", refresh.sub);

      

        if (user.is_blacklisted) {
  
          return res.status(401).json({ error: 'Given user is blacklisted from accessing the service' });
        }
        
        const payload_access = {
          exp: dateNow + 3600,
          iat: dateNow,
          sub: user.cid,
          name: user.name,
          registration_date: Math.floor(user.registration_date.getTime() / 1000),
          role: user.email === 'hello@mellie.dev' ? 'admin' : 'user'
        };
  
        const access = await sign(payload_access);
  
        return res.send({
          token_type: 'Bearer',
          expires_in: 3600,
          expires_on: dateNow + 3600,
          access_token: access,
          refresh_token: req.headers['refresh_token']
        });
      }

      return res.status(401).json({ error: 'Bad refresh_token provided to api.' });

    } catch (error: unknown) {
      console.log(error)
      //Ignored
    }

    return res.status(401).json({ error: 'Failed to refresh user token. It is unknown why this error is happening so don\'t ask me.' });
  } else {

    res.statusCode = 400;
    res.json({ message: "Missing required headers to process request" });
  }
};

