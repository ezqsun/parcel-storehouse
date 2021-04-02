import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@lib/db';
import { Employee } from '@lib/models/employees';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log(req.query);

    if (req.method === 'DELETE') {
        try {

            const ret = await query<Employee>("DELETE FROM employees WHERE eid = ?", ...[Number(req.body.deleteEid)]);
            return res.send(ret);

        } catch (error: unknown) {
            //Ignore
        }
        return res.status(401).json({ error: 'Unable to delete employee from database' });

    } 
    else {
        res.statusCode = 400;
        return res.json({ message: "Incorrect request method, unable to process request" });
    }


}








