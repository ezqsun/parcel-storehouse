import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {
  const employees = await query<any>(
    `SELECT 
      employees.eid,
      employees.phone_number, 
      employees.name, 
      employees.address, 
      employees.position,
      branches.bid as bid,
      branches.address as branch_address,
      branches.phone_number as branch_phone
    FROM employees
      LEFT JOIN works_at
        ON employees.eid = works_at.eid
      LEFT JOIN branches as branches
        ON branches.bid = works_at.bid
    ORDER BY eid`);

  const numProcessedByEmployee = await query<any>(
    `SELECT
      packages.eid, employees.name, COUNT(*) AS numPackages
    FROM packages
      INNER JOIN employees
        ON employees.eid = packages.eid
    GROUP BY packages.eid`);



  return {
    statusCode: 200,
    result: employees,
    numProcessed: numProcessedByEmployee
  };
});