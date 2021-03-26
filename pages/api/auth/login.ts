import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from '@lib/auth/createJwt';
import { querySingle } from '@lib/db';
import { createHash } from 'crypto';
import { Customer } from '@lib/models/customers';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if ("username" in req.headers && "password" in req.headers) {
    //Query database for password
    try {

        const user = await querySingle<Customer>("SELECT * FROM Customers WHERE email = ?", req.headers["username"]);

        var hash = createHash('sha256');
        var passBuf = Buffer.from(req.headers["password"] as string);
        const passHash = hash.update(passBuf).digest('hex');
    
        if (passHash === user.password) {
            console.log(user);

            if (user.is_blacklisted) {
                
                return res.status(401).json({ error: 'Given user is blacklisted from accessing the service' });
            }

            const dateNow = Math.floor(Date.now() / 1000);
            const payload_access = {
                exp: dateNow + 3600,
                iat: dateNow,
                sub: user.cid,
                name: user.name,
                registration_date: Math.floor(user.registration_date.getTime() / 1000)
            };

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
                expires_on: dateNow,
                access_token: access,
                refresh_token: refresh 
            });
        }

    } catch (error: unknown) {

        console.log(error);
    }

    return res.status(401).json({ error: 'A user with that email and password was not found' });



    res.json({ message: "Test" });
  } else {

    res.statusCode = 400;
    res.json({ message: "Missing required headers to process request" });
  }
};