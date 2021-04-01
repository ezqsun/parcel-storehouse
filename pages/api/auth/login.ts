import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from '@lib/auth/createJwt';
import { querySingle } from '@lib/db';
import { createHash } from 'crypto';
import { Customer } from '@lib/models/customers';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  if (req.method === 'OPTIONS') {

    return res.status(200).json({ status: 'allowed' });
  }

  if (req.method !== 'POST') {

    return res.status(400).json({ error: 'Invalid request.' });
  }

  if ("username" in req.headers && "password" in req.headers) {
    //Query database for password
    try {

      const user = await querySingle<Customer>("SELECT * FROM customers WHERE email = ?", req.headers["username"] as string);

      //Hash the provided password - note if this was prod, we would also want to salt and pepper but that isn't done here
      const hash = createHash('sha256');
      const passBuf = Buffer.from(req.headers["password"] as string);
      const passHash = hash.update(passBuf).digest('hex');

      if (passHash === user.password) {

        if (user.is_blacklisted) {

          return res.status(401).json({ error: 'Given user is blacklisted from accessing the service' });
        }

        const dateNow = Math.floor(Date.now() / 1000);
        const payload_access = {
          exp: dateNow + 3600,
          iat: dateNow,
          sub: user.cid,
          name: user.name,
          registration_date: Math.floor(user.registration_date.getTime() / 1000),
          role: user.email === 'hello@mellie.dev' ? 'admin' : 'user'
        };

        //Note: This is not how a refresh token should be made, because we cannot revoke it
        const payload_refresh = {
          exp: dateNow + 2678400,
          iat: dateNow,
          sub: user.cid
        };

        const access = await sign(payload_access);
        const refresh = await sign(payload_refresh);

        return res.send({
          token_type: 'Bearer',
          expires_in: 3600,
          expires_on: dateNow + 3600,
          access_token: access,
          refresh_token: refresh
        });
      }

    } catch (error: unknown) {
      //Ignored
    }

    return res.status(401).json({ error: 'A user with that email and password was not found' });
  } else {

    res.statusCode = 400;
    res.json({ message: "Missing required headers to process request" });
  }
};

