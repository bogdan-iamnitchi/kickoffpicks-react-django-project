import { AuthState, AuthAction } from "../actions-types/auth";
import { AuthActionType } from "../actions-types/auth/types";



const initialState: AuthState = {
  access: localStorage.getItem('access') || '',
  refresh: localStorage.getItem('refresh') || '',
  isAuthenticated: false,
  isChatEngineAuthenticated: false,
  user: null,
  errors: []
}

const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch(action.type) {
    case AuthActionType.AUTHENTICATED_SUCCESS:
        return {
            ...state,
            isAuthenticated: true
        }

    case AuthActionType.AUTHENTICATED_FAIL:
        return {
            ...state,
            isAuthenticated: false
        }

    case AuthActionType.LOGIN_SUCCESS:
    case AuthActionType.GOOGLE_AUTH_SUCCESS:
    case AuthActionType.GITHUB_AUTH_SUCCESS:
        localStorage.setItem('access', action.payload.access);
        localStorage.setItem('refresh', action.payload.refresh);
        return {
            ...state,
            isAuthenticated: true,
            access: action.payload.access,
            refresh: action.payload.refresh
        }

    case AuthActionType.SIGNUP_SUCCESS:
        return {
            ...state,
            isAuthenticated: false
        }
    
    case AuthActionType.LOGIN_FAIL:
    case AuthActionType.SIGNUP_FAIL:
    case AuthActionType.GOOGLE_AUTH_FAIL:
    case AuthActionType.GITHUB_AUTH_FAIL:
    case AuthActionType.CHAT_ENGINE_SIGNUP_FAIL:
    case AuthActionType.CHAT_ENGINE_LOGIN_FAIL:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        return {
            ...state,
            isAuthenticated: false,
            isChatEngineAuthenticated: false,
            access: null,
            refresh: null,
            errors: action.errors
        }

    case AuthActionType.USER_LOADED_SUCCESS:
        return {
            ...state,
            user: {
                ...state.user,
                id: action.payload.id,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
            }
        }

    case AuthActionType.USER_LOADED_FAIL:
        return {
            ...state,
            user: null
        }
    
    case AuthActionType.CHAT_ENGINE_LOGIN_SUCCESS:
        return {
            ...state,
            //add a new filed with password to the user
            isChatEngineAuthenticated: true,
        }

    case AuthActionType.CHAT_ENGINE_SIGNUP_SUCCESS:
        return {
            ...state,
            isChatEngineAuthenticated: false,
        }

    case AuthActionType.LOGOUT:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        return {
            ...state,
            isAuthenticated: false,
            isChatEngineAuthenticated: false,
            access: null,
            refresh: null,
            user: null
        }
    
    case AuthActionType.PASSWORD_RESET_SUCCESS:
    case AuthActionType.PASSWORD_RESET_FAIL:
    case AuthActionType.PASSWORD_RESET_CONFIRM_SUCCESS:
    case AuthActionType.PASSWORD_RESET_CONFIRM_FAIL:
    case AuthActionType.ACTIVATION_SUCCESS:
    case AuthActionType.ACTIVATION_FAIL:
        return {
            ...state
        }

    default:
        return state;
}
}

export default authReducer;