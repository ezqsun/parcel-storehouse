import { requireAuth } from "@lib/auth/verifyAuth";
import { verify } from "@lib/auth/verifyJwt";
import { AuthSuccessResponse } from "@lib/models/auth-response";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAuth(req, res, async (req) => {
    return {
        statusCode: 200,
        result: {
            name: req.name
        }
    }
});