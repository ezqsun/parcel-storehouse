import { requireAdmin } from "@lib/auth/verifyAuth";
import { querySingle } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {

  const counts = await getCounts(['customers', 'branches', 'couriers', 'packages', 'employees']);
  console.log(counts);
  
  return {
    statusCode: 200,
    result: counts
  };
});

//Magical function that gets 
async function getCounts(tableNames: string[]) {

  const queries = tableNames.map(tableName => querySingle<any>(`SELECT COUNT(*) FROM ${tableName}`));
  const countsTemp = (await Promise.all(queries));
  const counts = countsTemp.map(val => val['COUNT(*)'] as Number);
  return counts.map((val, idx) => ({ [tableNames[idx]]: val }));
}