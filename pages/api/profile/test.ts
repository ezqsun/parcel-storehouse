import { requireAuth } from "@lib/auth/verifyAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAuth(req, res, async (req) => {
    return {
        statusCode: 200,
        result: {
            name: req.name
        }
    };
});