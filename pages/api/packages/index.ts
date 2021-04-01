import type { NextApiRequest, NextApiResponse } from 'next';
import { query, querySingle } from '@lib/db';
import { Package } from '@lib/models/packages';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

    if ("cid" in req.body && "bid" in req.body && "eid" in req.body && "nid" in req.body) {

        try {

            const values = Object.values<(string | number)>(req.body);
            for (let i = 0; i < 4; i++) {
                values[i] = Number(values[i]);

            }
            console.log(values);

            const ret = await query<Package>("INSERT INTO packages (cid, bid, eid, nid, tracking_number, processed_date, ordered_date) VALUES (?,?,?,?,?,?,?)",
                ...values);
            //   const ret = await query<Package>("INSERT INTO packages (cid, bid, eid, nid, tracking_number, processed_date, ordered_date) VALUES (?,?,?,?,?,?,?)",
            //     ...values);


            return res.send(ret);


        } catch (error: unknown) {
            //Ignored
        }

        return res.status(401).json({ error: 'Unable to insert package into database' });
    } else {

        res.statusCode = 400;
        res.json({ message: "Missing required body content to process request" });
    }
};

