import { requireAdmin } from "@lib/auth/verifyAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAdmin(req, res, async (req) => {
  return {
    statusCode: 200,
    result: {
      name: req.name,
      role: req.role
    }
  };
});