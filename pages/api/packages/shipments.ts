import type { NextApiRequest, NextApiResponse } from 'next';
import { query, querySingle } from '@lib/db';
import { Package } from '@lib/models/packages';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'GET') {
        try {

            const ret = await query<Package>(`SELECT a.recipient_name
            FROM (SELECT AVG(s2.weight) AS avg_recipient_weight, s2.recipient_name
                    FROM shipments s2
                    GROUP BY s2.recipient_name)a CROSS JOIN (SELECT AVG(s1.weight) AS overall_avg_weight
                                                        FROM shipments s1)b
            WHERE a.avg_recipient_weight = b.overall_avg_weight;`, ...[]);
            console.log(ret);

            return res.send(ret);


        } catch (error: unknown) {
            //Ignored
        }

        return res.status(401).json({ error: 'Unable to query for shipment packages with desired average weight' });
    } else {

        res.statusCode = 400;
        return res.json({ message: "Incorrect request method. Unable to process request" });
    }


}



