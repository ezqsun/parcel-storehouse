import type { NextApiRequest, NextApiResponse } from 'next';
import { query, querySingle } from '@lib/db';
import { Package } from '@lib/models/packages';
import { StoredPackage } from '@lib/models/stored-packages';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log(req.query);

    if (req.method === 'DELETE') {
        // console.log('pid to delete is ' + Number(req.query.pid));
        try {

            const ret = await query<Package>("DELETE FROM packages WHERE pid = ?", Number(req.body.deletePid));
            return res.send(ret);

        } catch (error: unknown) {
            //Ignore
        }
        return res.status(401).json({ error: 'Unable to delete package from database' });

    } else if (req.method === 'PUT') {
        // console.log('pid to update is ' + Number(req.query.pid));
        // console.log('isPickedUP: ' + req.body.isPickedUp);
        const newPickedUp = (req.body.isPickedUp === 'true');
        // console.log(newPickedUp);

        try {
            const packageDetails = await querySingle<StoredPackage>("SELECT arrival_date, picked_up FROM shipment_bundles_contains_storage WHERE pid = ?", [Number(req.query.pid)]);
            const {arrival_date} = packageDetails;

            const insertDisposedOf = await query<StoredPackage>("INSERT IGNORE INTO shipment_bundles_to_dispose_of (arrival_date, picked_up) VALUES (?, ?)",[JSON.stringify(arrival_date).substring(1,11), newPickedUp]);
            // console.log('successful insert ignore');
            // console.log(insertDisposedOf);
            const update = await query<StoredPackage>("UPDATE shipment_bundles_contains_storage SET picked_up = ? WHERE pid = ?", [newPickedUp, Number(req.query.pid)]);
            // console.log('successful put');
        

            const ret = Promise.all([insertDisposedOf, update]);
            // console.log('successful promise all');
            return res.send(ret);
        } catch (error: unknown) {
            //Ignore
        }
        return res.status(401).json({ error: 'Unable to update pickup status' });

    }
    else {
        res.statusCode = 400;
        return res.json({ message: "Incorrect request method, unable to process request" });
    }


}








