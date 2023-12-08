import axios from "axios";
import { Dispatch } from "redux";
import { ActionType} from "../actions-types/types";
import { State } from "../actions-types";
import { Action } from "../actions-types/index";

export const load_user = () => async (dispatch: Dispatch<Action>) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem('access')}`,
            "Accept": "application/json"
        }
    };

    
    if (localStorage.getItem('access')) {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/auth/users/me/`,
                config
            );
    
            dispatch({
                type: ActionType.USER_LOADED_SUCCESS,
                payload: res.data
            });
    
        } catch (err) {
            dispatch({
                type: ActionType.USER_LOADED_FAIL
            });
        }
    }
    else {
        dispatch({
            type: ActionType.USER_LOADED_FAIL
        });
    }
};


export const googleAuthenticate = (state: State, code: string) => async (dispatch: Dispatch<Action>) => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details: { [key: string]: string } = {
            'state': String(state),
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);

            dispatch({
                type: ActionType.GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            load_user();
        } catch (err) {
            dispatch({
                type: ActionType.GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const githubAuthenticate = (state: State, code: string) => async (dispatch: Dispatch<Action>)  => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details: { [key: string]: string } = {
            'state': String(state),
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/o/github/?${formBody}`, config);

            dispatch({
                type: ActionType.GITHUB_AUTH_SUCCESS,
                payload: res.data
            });

            load_user();
        } catch (err) {
            dispatch({
                type: ActionType.GITHUB_AUTH_FAIL
            });
        }
    }
};

export const checkAuthenticated = () => async (dispatch: Dispatch<Action>) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: ActionType.AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: ActionType.AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: ActionType.AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: ActionType.AUTHENTICATED_FAIL
        });
    }
};

export const signup = (
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    re_password: string
) => async (dispatch: Dispatch<Action>) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/auth/users/`,
            body,
            config
        );

        dispatch({
            type: ActionType.SIGNUP_SUCCESS,
            payload: res.data
        });

        load_user();

    }
    catch (err) {
        dispatch({
            type: ActionType.SIGNUP_FAIL
        });
    }
};

export const verify = (uid: string, token: string) => async (dispatch: Dispatch<Action>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/auth/users/activation/`,
            body,
            config
        );

        dispatch({
            type: ActionType.ACTIVATION_SUCCESS
        });

    } catch (err) {
        dispatch({
            type: ActionType.ACTIVATION_FAIL
        });
    }

}

export const signin = (email: string, password: string) => async (dispatch: Dispatch<Action>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email, password });

    try {

        
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`,
            body,
            config
        );
            

        dispatch({
            type: ActionType.LOGIN_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: ActionType.LOGIN_FAIL
        });
    }

};

export const reset_password = (email: string) => async (dispatch: Dispatch<Action>) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/auth/users/reset_password/`,
            body,
            config
        );

        dispatch({
            type: ActionType.PASSWORD_RESET_SUCCESS
        });

    } catch (err) {
        dispatch({
            type: ActionType.PASSWORD_RESET_FAIL
        });
    }

}

export const reset_password_confirm = (
    uid: string, 
    token: string, 
    new_password: string, 
    re_new_password: string
) => async (dispatch: Dispatch<Action>) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/auth/users/reset_password_confirm/`,
            body,
            config
        );

        dispatch({
            type: ActionType.PASSWORD_RESET_CONFIRM_SUCCESS
        });

    } catch (err) {
        dispatch({
            type: ActionType.PASSWORD_RESET_CONFIRM_FAIL
        });
    }

}

export const logout = () => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.LOGOUT
    });
}