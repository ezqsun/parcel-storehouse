import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {
  const ship_bundle = await query<any>(
    `SELECT 
      sbid,
      cid,
      recipient_name,
      weight,
      shipping_date
    FROM shipment_bundles
    `);

  return {
    statusCode: 200,
    result: ship_bundle,
  };
});