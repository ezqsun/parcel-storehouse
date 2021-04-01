import { query } from '@lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  
  const nid = Number.parseInt(req.headers['nid'] as string);
  let discount = Number.parseFloat(req.headers['discount'] as string);

  if (Number.isNaN(discount) || discount < 0) {
    discount = 0;
  }

  let where = '';

  if (nid != -1 && !Number.isNaN(nid)) {
    where = ` AND nid=${nid}`;
  }

  const deal = await query<any>(
    `SELECT 
      MIN(discount_per_lb) as discount_per_lb,
      nid
    FROM 
      courier_branch_is_store_of_courier
    WHERE discount_per_lb > ? ${where}
    GROUP BY nid
    HAVING MIN(discount_per_lb) > ?`, discount, discount);

  res.status(200).json({
    result: deal
  });
};