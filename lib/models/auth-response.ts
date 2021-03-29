interface BaseAuthResponse {
    statusCode: number;
}

export interface AuthSuccessResponse extends BaseAuthResponse {
    result: any;
}

export interface AuthErrorResponse extends BaseAuthResponse {
    error: any;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse
