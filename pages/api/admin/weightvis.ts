import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {
  let sqlWhere = '';
  
  const year = Number.parseInt(req.rawRequest.headers['year'] as string);

  if (year != 0 && !Number.isNaN(year)) {
    sqlWhere = `WHERE YEAR(shipping_date)=${year}`
  }

  const weight = await query<any>(
    `SELECT 
      SUM(weight) as total_weight,
      shipping_date
    FROM 
      shipment_bundles
    ${sqlWhere}
    GROUP BY shipping_date`);

  return {
    statusCode: 200,
    result: weight,
  };
});