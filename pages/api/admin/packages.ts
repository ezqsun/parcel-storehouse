import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {

  //Note: This is safe because the only parameter the user controls must be an int.
  //      if it isn't it will be NaN; therefore, sanitized.
  let sqlWhere = '';
  const year = Number.parseInt(req.rawRequest.headers['year'] as string);
  if (year != 0 && !Number.isNaN(year)) {
    sqlWhere = `WHERE YEAR(packages.ordered_date)=${year}`
  }

  const custId = Number.parseInt(req.rawRequest.headers['cid'] as string);
  if (custId != -1 && !Number.isNaN(custId)) {

    if (sqlWhere) {
      sqlWhere += ` AND packages.cid=${custId}`;
    } else {
      sqlWhere = `WHERE packages.cid=${custId}`
    }
    //
  }

  if ((req.rawRequest.headers['showbanned'] as string) === 'no') {
    if (sqlWhere) {
      sqlWhere += ' AND customers.is_blacklisted=0'
    } else {
      sqlWhere = 'WHERE customers.is_blacklisted=0'
    }
  }

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
    ${sqlWhere} 
    ORDER BY packages.pid`);

  return {
    statusCode: 200,
    result: packages
  };
});