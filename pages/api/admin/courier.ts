import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {
  const couriers = await query<any>(`SELECT * FROM couriers`);

  return {
    statusCode: 200,
    result: couriers,
  };
});