import { UserToken } from "contexts/user-reducer";
import { NextApiRequest } from "next";

export interface AuthUserRequest extends UserToken {
  rawRequest: NextApiRequest
}