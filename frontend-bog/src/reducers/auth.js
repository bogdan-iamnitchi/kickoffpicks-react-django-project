import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    USER_LOADED_SUCCESS, 
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    GITHUB_AUTH_SUCCESS,
    GITHUB_AUTH_FAIL,
    LOGOUT,
} from "../actions/types";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
}

export default function reduce(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }

        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
        case GITHUB_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case GOOGLE_AUTH_FAIL:
        case GITHUB_AUTH_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }

        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }

        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }

        

        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }

        default:
            return state;
    }
}