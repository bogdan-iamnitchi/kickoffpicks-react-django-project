import axios from "axios";
import { Dispatch } from "redux";
import { AuthActionType} from "../actions-types/auth/types";
import { AuthAction } from "../actions-types/auth/index";

export const chat_engine_signin = (username: string, secret: string) => async (dispatch: Dispatch<AuthAction>) => {
    const config = {
        headers: {
            "Project-ID": import.meta.env.VITE_APP_CHAT_ENGINE_PROJECT_ID,
            "User-Name": username,
            "User-Secret": secret
        }
    };
    
    

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_CHAT_ENGINE_APP_URL}/users/me/`,
            config
        );

        dispatch({
            type: AuthActionType.CHAT_ENGINE_LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch<any>(load_user());

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: AuthActionType.CHAT_ENGINE_LOGIN_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: AuthActionType.CHAT_ENGINE_LOGIN_FAIL,
                errors: []
            });
        }
    }

};

export const chat_engine_signup = (
    username: string, 
    secret: string, 
    email: string, 
    first_name: string, 
    last_name: string, 
) => async (dispatch: Dispatch<AuthAction>) => {

    const config = {
        headers: {
            "Private-Key": `${import.meta.env.VITE_APP_CHAT_ENGINE_PRIVATE_KEY}`
        }
    };

    const body = {
        "username": username,
        "secret": secret,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
    };


    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_CHAT_ENGINE_APP_URL}/users/`,
            body,
            config
        );

        dispatch({
            type: AuthActionType.CHAT_ENGINE_SIGNUP_SUCCESS,
            payload: res.data
        });

    }
    catch (err) {
        dispatch({
            type: AuthActionType.CHAT_ENGINE_SIGNUP_FAIL,
            errors: []
        });

    }
};

export const load_user = () => async (dispatch: Dispatch<AuthAction>) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem('access')}`,
            "Accept": "application/json"
        }
    };

    // console.log(localStorage.getItem('access'));
    if (localStorage.getItem('access')) {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/auth/users/me/`,
                config
            );
    
            dispatch({
                type: AuthActionType.USER_LOADED_SUCCESS,
                payload: res.data
            });
    
        } catch (err) {
            dispatch({
                type: AuthActionType.USER_LOADED_FAIL
            });
        }
    }
    else {
        dispatch({
            type: AuthActionType.USER_LOADED_FAIL
        });
    }
};




export const signup = (
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    re_password: string
) => async (dispatch: Dispatch<AuthAction>) => {

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
            type: AuthActionType.SIGNUP_SUCCESS,
            payload: res.data
        });

        dispatch<any>(load_user());

    }
    catch (err) {

        //check if err is of type isAxiosError
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: AuthActionType.SIGNUP_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: AuthActionType.SIGNUP_FAIL,
                errors: []
            });
        }

    }
};

export const signin = (email: string, password: string) => async (dispatch: Dispatch<AuthAction>) => {
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
            type: AuthActionType.LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch<any>(load_user());

    } catch (err) {
        //check if err is of type isAxiosError
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: AuthActionType.LOGIN_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: AuthActionType.LOGIN_FAIL,
                errors: []
            });
        }
    }

};

export const googleAuthenticate = (state: string, code: string) => async (dispatch: Dispatch<AuthAction>) => {
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
                type: AuthActionType.GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch<any>(load_user());

        } catch (err) {
            //check if err is of type isAxiosError
            if (axios.isAxiosError(err)) {
                if(err.response?.data) {
                    dispatch({
                        type: AuthActionType.GOOGLE_AUTH_FAIL,
                        errors: err.response.data
                    });
                }
            }
            else {
                dispatch({
                    type: AuthActionType.GOOGLE_AUTH_FAIL,
                    errors: []
                });
            }
        }
    }
};

export const githubAuthenticate = (state: string, code: string) => async (dispatch: Dispatch<AuthAction>)  => {
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
                type: AuthActionType.GITHUB_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch<any>(load_user());
        } catch (err) {

            //check if err is of type isAxiosError
            if (axios.isAxiosError(err)) {
                if(err.response?.data) {
                    dispatch({
                        type: AuthActionType.GITHUB_AUTH_FAIL,
                        errors: err.response.data
                    });
                }
            }
            else {
                dispatch({
                    type: AuthActionType.GITHUB_AUTH_FAIL,
                    errors: []
                });
            }
        }
    }
};

export const checkAuthenticated = () => async (dispatch: Dispatch<AuthAction>) => {
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
                    type: AuthActionType.AUTHENTICATED_SUCCESS
                });

                dispatch<any>(load_user());

            } else {
                dispatch({
                    type: AuthActionType.AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AuthActionType.AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AuthActionType.AUTHENTICATED_FAIL
        });
    }
};

export const verify = (uid: string, token: string) => async (dispatch: Dispatch<AuthAction>) => {
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
            type: AuthActionType.ACTIVATION_SUCCESS
        });

    } catch (err) {
        dispatch({
            type: AuthActionType.ACTIVATION_FAIL
        });
    }

}



export const reset_password = (email: string) => async (dispatch: Dispatch<AuthAction>) => {
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
            type: AuthActionType.PASSWORD_RESET_SUCCESS
        });

    } catch (err) {
        dispatch({
            type: AuthActionType.PASSWORD_RESET_FAIL
        });
    }

}

export const reset_password_confirm = (
    uid: string, 
    token: string, 
    new_password: string, 
    re_new_password: string
) => async (dispatch: Dispatch<AuthAction>) => {

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
            type: AuthActionType.PASSWORD_RESET_CONFIRM_SUCCESS
        });

    } catch (err) {
        dispatch({
            type: AuthActionType.PASSWORD_RESET_CONFIRM_FAIL
        });
    }

}

export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
        type: AuthActionType.LOGOUT
    });
}