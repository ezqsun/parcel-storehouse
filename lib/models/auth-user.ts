import { NextApiRequest } from "next";

export interface AuthUserRequest {
    name: string,
    rawRequest: NextApiRequest
}