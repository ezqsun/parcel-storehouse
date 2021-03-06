import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {

  const branchId = Number.parseInt(req.rawRequest.headers['bid'] as string);

  let sqlWhere = '';

  if (branchId != -1 && !Number.isNaN(branchId)) {
    sqlWhere = `WHERE branches.bid=${branchId}`;
  }

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
    ${sqlWhere}
    GROUP BY packages.cid, packages.bid
    ORDER BY packages.bid`);

  return {
    statusCode: 200,
    result: branchCust,
  };
});