import type { NextApiRequest, NextApiResponse } from 'next';
import { query, querySingle } from '@lib/db';
import { Package } from '@lib/models/packages';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'GET') {
        try {

            const ret = await query<Package>(`(SELECT c.name
                FROM customers c
                WHERE NOT EXISTS (SELECT n.nid
                                    FROM couriers n
                                    WHERE NOT EXISTS (SELECT p.cid
                                                        FROM packages p
                                                        WHERE c.cid = p.cid AND n.nid = p.nid)));`, ...[]);
            console.log(ret);

            return res.send(ret);


        } catch (error: unknown) {
            //Ignored
        }

        return res.status(401).json({ error: 'Unable to query for customers who have ordered using all couriers' });
    } else {

        res.statusCode = 400;
        return res.json({ message: "Incorrect request method. Unable to process request" });
    }


}





