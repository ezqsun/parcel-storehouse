import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: 'db-mysql-sfo2-23027-do-user-8890113-0.b.db.ondigitalocean.com:25060',
    database: 'cpscdb',
    user: 'cpscuser',
    password: 'ul1ntaqdwfcl3rqq'
  }
});

/*
 * Queries the database
 */
export async function query<T>(queryString: string, queryParams: (string | number)[] | string | number): Promise<T | unknown> {
  try {
    const queryResult = await db.query<T>(queryString, queryParams);
    await db.end();
    return queryResult;
  } catch (error: unknown) {
    return error;
  }
}