import type { NextApiRequest, NextApiResponse } from 'next';
import { query, querySingle } from '@lib/db';
import { Package } from '@lib/models/packages';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log(req.query);

    if (req.method === 'DELETE') {
        console.log('pid to delete is ' + Number(req.query.id));
        try {

            const ret = await query<Package>("DELETE FROM packages WHERE pid = ?", Number(req.body.deletePid));
            return res.send(ret);

        } catch (error: unknown) {
            //Ignore
        }

    } else{
        res.statusCode=400;
        return res.json({message: "Incorrect request method, unable to process deletion"});
    }


}








