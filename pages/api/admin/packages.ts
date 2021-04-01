import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {
  const packages = await query<any>(
    `SELECT
      packages.pid,
      packages.tracking_number,
      packages.processed_date,
      packages.cid,
      packages.ordered_date,
      couriers.name AS courier_name,
      customers.name AS customer_name
    FROM packages
      INNER JOIN couriers
        ON couriers.nid = packages.nid
      INNER JOIN customers
        ON customers.cid = packages.cid
    ORDER BY packages.pid`);

  return {
    statusCode: 200,
    result: packages
  };
});