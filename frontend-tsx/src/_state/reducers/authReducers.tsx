import { State, Action } from "../actions-types";
import { ActionType } from "../actions-types/types";



const initialState: State = {
  access: localStorage.getItem('access') || '',
  refresh: localStorage.getItem('refresh') || '',
  isAuthenticated: false,
  user: null
}

const authReducer = (state: State = initialState, action: Action) => {
  switch(action.type) {
    case ActionType.AUTHENTICATED_SUCCESS:
        return {
            ...state,
            isAuthenticated: true
        }

    case ActionType.AUTHENTICATED_FAIL:
        return {
            ...state,
            isAuthenticated: false
        }

    case ActionType.LOGIN_SUCCESS:
    case ActionType.GOOGLE_AUTH_SUCCESS:
    case ActionType.GITHUB_AUTH_SUCCESS:
        localStorage.setItem('access', action.payload.access);
        localStorage.setItem('refresh', action.payload.refresh);
        return {
            ...state,
            isAuthenticated: true,
            access: action.payload.access,
            refresh: action.payload.refresh
        }

    case ActionType.SIGNUP_SUCCESS:
        return {
            ...state,
            isAuthenticated: false
        }
    
    case ActionType.LOGIN_FAIL:
    case ActionType.SIGNUP_FAIL:
    case ActionType.GOOGLE_AUTH_FAIL:
    case ActionType.GITHUB_AUTH_FAIL:
    case ActionType.LOGOUT:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return {
            ...state,
            isAuthenticated: false,
            access: null,
            refresh: null,
            user: null
        }

    case ActionType.USER_LOADED_SUCCESS:
        return {
            ...state,
            user: action.payload
        }

    case ActionType.USER_LOADED_FAIL:
        return {
            ...state,
            user: null
        }

    

    case ActionType.PASSWORD_RESET_SUCCESS:
    case ActionType.PASSWORD_RESET_FAIL:
    case ActionType.PASSWORD_RESET_CONFIRM_SUCCESS:
    case ActionType.PASSWORD_RESET_CONFIRM_FAIL:
    case ActionType.ACTIVATION_SUCCESS:
    case ActionType.ACTIVATION_FAIL:
        return {
            ...state
        }

    default:
        return state;
}
}

export default authReducer;