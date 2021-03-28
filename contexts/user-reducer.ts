export interface AuthUser {
    access_token: string,
    expires_in: number,
    expires_on: number,
    refresh_token: string,
    token_type: string
}

export interface AuthReduer {
    type: 'LOGIN' | 'LOGOUT',
    authResult?: AuthUser
}

export const reducer = (state, action: AuthReduer) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...action.authResult
            };
        case 'LOGOUT':
            return null;
    }
}

export const initialState = null