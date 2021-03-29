import { verify } from "@lib/auth/verifyJwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.headers.authorization) {
        //Query database for password
        try {
            
            const [type, credentials] = req.headers.authorization.split(' ');

            if (type === "Bearer") {
                const verifyRes = await verify(credentials)
                return res.json({verifyRes})

            } else if (type === "Basic") {
                return res.status(500).json({ error: 'Basic auth not supported for api.' })
            }
        } catch (error: unknown) {
            return res.status(401).json({ error });
        }

    } else {

        res.statusCode = 401;
        res.json({ message: "Missing required authorization header to process request" });
    }
};
