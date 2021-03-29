import { UserDatabase } from "./user-index";

export interface AuthUser {
    access_token: string,
    expires_in: number,
    expires_on: number,
    refresh_token: string,
    token_type: string
}

export interface AuthReduer {
    type: 'LOGIN' | 'LOGOUT' | 'SET_AUTH',
    authResult?: AuthUser
}

if (process.browser) {

    var db = new UserDatabase('userDb');

    db.open().catch(err => {
        console.error(`Open failed: ${err.stack}`);
    });
}

export const reducer = (state, action: AuthReduer) => {
    switch (action.type) {
        case 'LOGIN':
            db.user.put(action.authResult, 0);
            return {
                ...action.authResult
            };
        case 'LOGOUT':
            db.user.clear();
            return null;
        case 'SET_AUTH':
            return {
                ...action.authResult
            };
    }
}

export const initialState = null

