import axios from "axios";

import { Dispatch } from "redux";
import { RoomActionType } from "../actions-types/rooms/types";
import { RoomAction } from "../actions-types/rooms";

export const createRoom = (tournament: string, max_players: number, votes_to_skip: number) => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    const body = {
        "tournament": tournament,
        "max_players": max_players,
        "votes_to_skip": votes_to_skip
    }

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/create-room/`,
            body,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: RoomActionType.CREATE_ROOM_SUCCESS,
            payload: res.data
        });

        console.log(res.data.code);
        // dispatch<any>(loadRoomDetails(res.data.code))

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.CREATE_ROOM_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.CREATE_ROOM_FAIL,
                errors: []
            });
        }
    }

};

export const updateRoom = (max_players: number, votes_to_skip: number, code: string, ) => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    const body = {
        "max_players": max_players,
        "votes_to_skip": votes_to_skip,
        "code": code,
    }

    try {
        const res = await axios.patch(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/update-room/`,
            body,
            config
        );
        
        console.log(res.data);

        dispatch({
            type: RoomActionType.UPDATE_ROOM_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.UPDATE_ROOM_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.UPDATE_ROOM_FAIL,
                errors: []
            });
        }
    }

};

export const joinRoom = (code: string) => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    const body = {
        "code": code,
    }

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/join-room/`,
            body,
            config
        );
        
        console.log(res.data);

        dispatch({
            type: RoomActionType.JOIN_ROOM_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.JOIN_ROOM_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.JOIN_ROOM_FAIL,
                errors: []
            });
        }
    }

};

export const loadRoomDetails = (code: string) => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/get-room/?code=${code}`,
            config
        );
        
        console.log(res.data);

        dispatch({
            type: RoomActionType.LOAD_ROOM_DETAILS_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.LOAD_ROOM_DETAILS_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.LOAD_ROOM_DETAILS_FAIL,
                errors: []
            });
        }
    }

};

export const userInRoom = () => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/user-in-room/`,
            config
        );
        
        console.log(res.data);

        if(res.data.code == null) {
            dispatch({
                type: RoomActionType.USER_IN_ROOM_FAIL,
                errors: []
            });
        }
        else {
            dispatch({
                type: RoomActionType.USER_IN_ROOM_SUCCESS,
                payload: res.data
            });
        }

    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.USER_IN_ROOM_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.USER_IN_ROOM_FAIL,
                errors: []
            });
        }
    }

};

export const leaveRoom = () => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    const body = {
        "code": "",
    }

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/leave-room/`,
            body,
            config
        );
        
        console.log(res.data);

        dispatch({
            type: RoomActionType.LEAVE_ROOM_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.LEAVE_ROOM_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.LEAVE_ROOM_FAIL,
                errors: []
            });
        }
    }

};

export const startRoom = () => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    const body = {
        "code": "",
    }

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/start-room/`,
            body,
            config
        );
        
        console.log(res.data);

        dispatch({
            type: RoomActionType.START_ROOM_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.START_ROOM_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.START_ROOM_FAIL,
                errors: []
            });
        }
    }

};

export const endRoom = () => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    const body = {
        "code": "",
    }

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/end-room/`,
            body,
            config
        );
        
        console.log(res.data);

        dispatch({
            type: RoomActionType.END_ROOM_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.END_ROOM_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.END_ROOM_FAIL,
                errors: []
            });
        }
    }

};