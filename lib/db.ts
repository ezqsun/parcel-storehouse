import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: '',
    database: '',
    user: '',
    password: ''
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