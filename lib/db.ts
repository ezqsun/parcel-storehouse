import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: '34.69.99.207',
    database: 'cpscdb',
    user: 'cpscuser',
    password: 'ul1ntaqdwfcl3rqq'
  }
});

/*
 * Queries the database
 */
export async function query<T>(queryString: string, queryParams: (string | number)[] | string | number): Promise<T[]> {
  const queryResult = await db.query<T[]>(queryString, queryParams);
  await db.end();
  return queryResult;
}

export async function querySingle<T>(queryString: string, queryParams: (string | number)[] | string | number): Promise<T> {
  const queryResult = await db.query<T[]>(queryString, queryParams);
  await db.end();

  if (queryResult.length === 1) {
    return queryResult[0];
  }
  throw new Error(`Error with query. Query returned ${queryResult.length} items instead of the desired one item.`);
}

export async function queryAll<T>(queryString:string): Promise<T[]>{
  const queryResult = await db.query<T[]>(queryString);
  await db.end();
  return queryResult;
}
