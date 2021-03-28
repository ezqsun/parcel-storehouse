import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from '@lib/auth/createJwt';
import { querySingle } from '@lib/db';
import { createHash } from 'crypto';
import { Customer } from '@lib/models/customers';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if ("username" in req.headers && "password" in req.headers) {
    //Query database for password
    try {
        
    } catch (error: unknown) {
        console.log(error);
    }

    return res.status(401).json({ error: 'A user with that email and password was not found' });
  } else {

    res.statusCode = 400;
    res.json({ message: "Missing required headers to process request" });
  }
};