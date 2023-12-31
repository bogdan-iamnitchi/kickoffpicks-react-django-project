import { ActionType } from "./types"

interface LoginSuccesAction {
    type: ActionType.LOGIN_SUCCESS,
    payload: any
}

interface LoginFailAction {
    type: ActionType.LOGIN_FAIL,
    errors: any
}

interface SignupSuccesAction {
    type: ActionType.SIGNUP_SUCCESS,
    payload: any
}

interface SignupFailAction {
    type: ActionType.SIGNUP_FAIL,
    errors: any
}

interface ActivationSuccesAction {
    type: ActionType.ACTIVATION_SUCCESS,
}

interface ActivationFailAction {
    type: ActionType.ACTIVATION_FAIL,
}

interface UserLoadedSuccesAction {
    type: ActionType.USER_LOADED_SUCCESS,
    payload: any
}

interface UserLoadedFailAction {
    type: ActionType.USER_LOADED_FAIL,
}

interface AuthenticatedSuccesAction {
    type: ActionType.AUTHENTICATED_SUCCESS,
}

interface AuthenticatedFailAction {
    type: ActionType.AUTHENTICATED_FAIL,
}

interface PasswordResetSuccesAction {
    type: ActionType.PASSWORD_RESET_SUCCESS,
}

interface PasswordResetFailAction {
    type: ActionType.PASSWORD_RESET_FAIL,
}

interface PasswordResetConfirmSuccesAction {
    type: ActionType.PASSWORD_RESET_CONFIRM_SUCCESS,
}

interface PasswordResetConfirmFailAction {
    type: ActionType.PASSWORD_RESET_CONFIRM_FAIL,
}

interface GoogleAuthSuccesAction {
    type: ActionType.GOOGLE_AUTH_SUCCESS,
    payload: any
}

interface GoogleAuthFailAction {
    type: ActionType.GOOGLE_AUTH_FAIL,
    errors: any
}

interface GithubAuthSuccesAction {
    type: ActionType.GITHUB_AUTH_SUCCESS,
    payload: any
}

interface GithubAuthFailAction {
    type: ActionType.GITHUB_AUTH_FAIL,
    errors: any
}

interface LogoutAction {
    type: ActionType.LOGOUT
}


interface ChatEngineLoginAction {
    type: ActionType.CHAT_ENGINE_LOGIN_SUCCESS,
    payload: any
}

interface ChatEngineLoginFailAction {
    type: ActionType.CHAT_ENGINE_LOGIN_FAIL,
    errors: any
}

interface ChatEngineSignupAction {
    type: ActionType.CHAT_ENGINE_SIGNUP_SUCCESS,
    payload: any
}

interface ChatEngineSignupFailAction {
    type: ActionType.CHAT_ENGINE_SIGNUP_FAIL,
    errors: any
}



export type Action = 
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

export type State = {
    access: string,
    refresh: string,
    isAuthenticated: boolean,
    isChatEngineAuthenticated: boolean,
    user: any,
    errors: Errors
}