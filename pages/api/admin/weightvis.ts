import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {
  const weight = await query<any>(
    `SELECT 
      SUM(weight) as total_weight,
      shipping_date
    FROM 
      shipment_bundles
    GROUP BY shipping_date`);

  return {
    statusCode: 200,
    result: weight,
  };
});