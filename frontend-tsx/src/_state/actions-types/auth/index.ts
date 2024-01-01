import { AuthActionType } from "./types"

interface LoginSuccesAction {
    type: AuthActionType.LOGIN_SUCCESS,
    payload: any
}

interface LoginFailAction {
    type: AuthActionType.LOGIN_FAIL,
    errors: any
}

interface SignupSuccesAction {
    type: AuthActionType.SIGNUP_SUCCESS,
    payload: any
}

interface SignupFailAction {
    type: AuthActionType.SIGNUP_FAIL,
    errors: any
}

interface ActivationSuccesAction {
    type: AuthActionType.ACTIVATION_SUCCESS,
}

interface ActivationFailAction {
    type: AuthActionType.ACTIVATION_FAIL,
}

interface UserLoadedSuccesAction {
    type: AuthActionType.USER_LOADED_SUCCESS,
    payload: any
}

interface UserLoadedFailAction {
    type: AuthActionType.USER_LOADED_FAIL,
}

interface AuthenticatedSuccesAction {
    type: AuthActionType.AUTHENTICATED_SUCCESS,
}

interface AuthenticatedFailAction {
    type: AuthActionType.AUTHENTICATED_FAIL,
}

interface PasswordResetSuccesAction {
    type: AuthActionType.PASSWORD_RESET_SUCCESS,
}

interface PasswordResetFailAction {
    type: AuthActionType.PASSWORD_RESET_FAIL,
}

interface PasswordResetConfirmSuccesAction {
    type: AuthActionType.PASSWORD_RESET_CONFIRM_SUCCESS,
}

interface PasswordResetConfirmFailAction {
    type: AuthActionType.PASSWORD_RESET_CONFIRM_FAIL,
}

interface GoogleAuthSuccesAction {
    type: AuthActionType.GOOGLE_AUTH_SUCCESS,
    payload: any
}

interface GoogleAuthFailAction {
    type: AuthActionType.GOOGLE_AUTH_FAIL,
    errors: any
}

interface GithubAuthSuccesAction {
    type: AuthActionType.GITHUB_AUTH_SUCCESS,
    payload: any
}

interface GithubAuthFailAction {
    type: AuthActionType.GITHUB_AUTH_FAIL,
    errors: any
}

interface LogoutAction {
    type: AuthActionType.LOGOUT
}


interface ChatEngineLoginAction {
    type: AuthActionType.CHAT_ENGINE_LOGIN_SUCCESS,
    payload: any
}

interface ChatEngineLoginFailAction {
    type: AuthActionType.CHAT_ENGINE_LOGIN_FAIL,
    errors: any
}

interface ChatEngineSignupAction {
    type: AuthActionType.CHAT_ENGINE_SIGNUP_SUCCESS,
    payload: any
}

interface ChatEngineSignupFailAction {
    type: AuthActionType.CHAT_ENGINE_SIGNUP_FAIL,
    errors: any
}



export type AuthAction = 
    LoginSuccesAction 
    | LoginFailAction
    | SignupSuccesAction
    | SignupFailAction
    | ActivationSuccesAction
    | ActivationFailAction
    | UserLoadedSuccesAction
    | UserLoadedFailAction
    | AuthenticatedSuccesAction
    | AuthenticatedFailAction
    | PasswordResetSuccesAction
    | PasswordResetFailAction
    | PasswordResetConfirmSuccesAction
    | PasswordResetConfirmFailAction
    | GoogleAuthSuccesAction
    | GoogleAuthFailAction
    | GithubAuthSuccesAction
    | GithubAuthFailAction
    | LogoutAction
    
    | ChatEngineLoginAction
    | ChatEngineLoginFailAction
    | ChatEngineSignupAction
    | ChatEngineSignupFailAction


export type Errors = Array<{ [key: string]: string[] }>

export type AuthState = {
    access: string,
    refresh: string,
    isAuthenticated: boolean,
    isChatEngineAuthenticated: boolean,
    user: any,
    errors: Errors
}