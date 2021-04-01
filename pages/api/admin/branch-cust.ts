import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {
  const branchCust = await query<any>(
    `SELECT 
      packages.cid,
      packages.bid,
      customers.name,
      customers.email
    FROM packages
    JOIN branches
      ON branches.bid=packages.bid
    JOIN customers
      ON packages.cid=customers.cid
    GROUP BY packages.cid, packages.bid
    ORDER BY packages.bid`);

  return {
    statusCode: 200,
    result: branchCust,
  };
});