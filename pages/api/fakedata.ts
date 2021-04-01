import { query } from '@lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import faker from 'faker';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  
  let fake_shipment_bundles = '';

  const fromDate = new Date();
  fromDate.setFullYear(fromDate.getFullYear() - 10);

  const toDate = new Date();

  for (let i = 0; i < 1000; i++) {

    const fakeDate = faker.date.between(fromDate, toDate);
    fake_shipment_bundles += `(DEFAULT, ${(i % 4) + 1}, ${faker.datatype.number(10000) / 100}, ` +
    `'${faker.name.firstName().replace("'", "")} ${faker.name.lastName().replace("'", "")}', ` + 
    `'${faker.address.streetAddress().replace("'", "")} ${faker.address.city().replace("'", "")}',` +
    ` '${fakeDate.getFullYear()}-${fakeDate.getMonth() + 1}-${fakeDate.getDate()}', ${(i % 7) + 1}, ${(i % 3) + 1}),\n`
  }

  res.status(200).send(fake_shipment_bundles);
};