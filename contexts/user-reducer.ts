import { UserDatabase } from "./user-index";

export interface AuthUser {
  access_token: string,
  expires_in: number,
  expires_on: number,
  refresh_token: string,
  token_type: string,
  user_data: UserToken
}

export interface UserToken {
  exp: number;
  iat: number;
  sub: number;
  name: string;
  registration_date: number;
  role: 'admin' | 'user';
}

export interface AuthReducer {
  type: 'LOGIN' | 'LOGOUT' | 'SET_AUTH' | 'UPDATE_AUTH',
  authResult?: AuthUser
}

let db: UserDatabase;

if (process.browser) {

  db = new UserDatabase('userDb');

  db.open().catch(err => {
    console.error(`Open failed: ${err.stack}`);
  });
}

export const reducer = (_: AuthUser, action: AuthReducer): AuthUser => {

  switch (action.type) {
    case 'LOGIN':
      db.user.put(action.authResult, 0);
      return {
        ...action.authResult,
        user_data: decodeUserToken(action.authResult.access_token)
      };
    case 'SET_AUTH':
      return {
        ...action.authResult,
        user_data: decodeUserToken(action.authResult.access_token)
      };
    case 'UPDATE_AUTH':
      db.user.clear();
      db.user.put(action.authResult, 0);
      return {
        ...action.authResult,
        user_data: decodeUserToken(action.authResult.access_token)
      };
    case 'LOGOUT':
    default:
      db.user.clear();
      return null;
  }
};

function decodeUserToken(token: string) {
  return JSON.parse(atob(token.split('.')[1]));
}

export const initialState = null;

