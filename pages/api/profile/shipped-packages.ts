import { requireAdmin, requireAuth } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAuth(req, res, async (req) => {
  const packages = await query<any>(
    `SELECT
      packages.pid,
      packages.tracking_number,
      packages.processed_date,
      packages.ordered_date,
      couriers.name AS courier_name
    FROM packages
      INNER JOIN couriers
        ON couriers.nid = packages.nid
    WHERE packages.cid = ?
    ORDER BY packages.pid`, req.sub);

  return {
    statusCode: 200,
    result: packages
  };
});