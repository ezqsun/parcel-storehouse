import { requireAuth } from "@lib/auth/verifyAuth";
import { querySingle, queryEmpty } from "@lib/db";
import { Customer } from "@lib/models/customers";
import { UserDatabase } from "contexts/user-index";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => requireAuth(req, res, async (req) => {

  if (req.rawRequest.method === 'OPTIONS') {

    return {
      statusCode: 200,
      result: 'allowed'
    };
  }

  if (req.rawRequest.method === 'PUT' || req.rawRequest.method === 'POST') {

    const newData = req.rawRequest.body as Customer;
    return updateUserData(newData, req.sub);
  }

  if (req.rawRequest.method === 'GET') {
    return getUserData(req.sub);
  }

  return {
    statusCode: 404,
    result: 'Unknown HTTP method provided.'
  };
});

async function updateUserData(cus: Customer, cid: number) {

  if (cus.cid != cid) {
    return {
      statusCode: 403,
      error: 'Invalid cid provided to server.'
    }
  }

  queryEmpty(
    `UPDATE 
      customers 
    SET 
      email=?,
      address=?,
      name=?,
      phone_number=?
    WHERE cid=?`, cus.email, cus.address, cus.name, cus.phone_number, cid);

  return {
    statusCode: 200,
    result: 'Updated user data successfully!'
  };
}

async function getUserData(cid: number) {
  const user = await querySingle<Customer>("SELECT * FROM customers WHERE cid = ?", cid);

  delete user.password;
  return {
    statusCode: 200,
    result: user
  }
}