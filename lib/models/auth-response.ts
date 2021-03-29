interface BaseAuthResponse {
    statusCode: number;
}

export interface AuthSuccessResponse extends BaseAuthResponse {
    result: object;
}

export interface AuthErrorResponse extends BaseAuthResponse {
    error: object;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse
