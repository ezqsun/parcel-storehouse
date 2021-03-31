import { AuthResponse } from "@lib/models/auth-response";
import { AuthUserRequest } from "@lib/models/auth-user";
import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "./verifyJwt";

export const requireAuth = async (req: NextApiRequest, res: NextApiResponse, handler: (req: AuthUserRequest) => Promise<AuthResponse>) => {
    if (!req.headers.authorization) {
        
        return res.status(401).json({ error: 'Missing required authorization header.' });
    }


    try {
        const [type, credentials] = req.headers.authorization.split(' ', 2);

        if (!type || !credentials) {
            res.status(401).json({ error: 'Invalid authorization header provided.' });
        }

        switch (type) {
            case 'Bearer':
                const verifyRes = await verify(credentials);
                if (verifyRes) {
                    const jwtPayload = JSON.parse(verifyRes.payload.toString());
                    const dateNow = Math.floor(Date.now() / 1000);
                    if (jwtPayload.exp >= dateNow) {
                        return res.status(401).json({ error: 'Expired bearer token provided to api.'});
                    }
                    const invokeResult = await handler({
                        name: jwtPayload.name,
                        rawRequest: req
                    });
                    const invokeDisplay = { ...invokeResult };
                    delete invokeDisplay.statusCode;
                    return res.status(invokeResult.statusCode).json(invokeDisplay);
                }
                break;
            case 'Basic':
                return res.status(401).json({ error: 'Basic auth is not yet supported by this api.' });
            default:
                return res.status(401).json({ error: 'Unknown authorization type received.' });
        }
        return res.status(401).json({ error: 'Invalid authorization credentials provided.' });
    } catch (err: unknown) {

        return res.status(401).json({ error: 'Unknown authorization error occurred.' });
    }
};