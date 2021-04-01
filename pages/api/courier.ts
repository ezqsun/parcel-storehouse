import { requireAdmin } from "@lib/auth/verifyAuth";
import { query } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const couriers = await query<any>(`SELECT * FROM couriers`);
  
  res.status(200).json({ result: couriers })
};