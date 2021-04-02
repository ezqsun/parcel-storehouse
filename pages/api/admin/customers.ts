import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {

  const points = Number.parseInt(req.rawRequest.headers['points'] as string);

  let sqlWhere = '';

  if (points != -1 && !Number.isNaN(points)) {
    sqlWhere = `WHERE points>=${points}`;
  }

  const customers = await query<any>(
    `SELECT 
      customers.cid,
      customers.address,
      customers.email,
      customers.name,
      customers.points, 
      customers.registration_date,
      customers.phone_number,
      customers.is_blacklisted,
      COUNT(packages.pid) AS shipped_packages
    FROM customers
      LEFT JOIN packages
        ON packages.cid = customers.cid
    ${sqlWhere}
    GROUP BY cid
    `);

  return {
    statusCode: 200,
    result: customers,
  };
});