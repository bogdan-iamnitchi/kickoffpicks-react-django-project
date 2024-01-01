import axios from "axios";

import { Dispatch } from "redux";
import { RoomActionType } from "../actions-types/rooms/types";
import { RoomAction } from "../actions-types/rooms";

export const createRoom = (tournament: string, max_players: number, votes_to_skip: number) => async (dispatch: Dispatch<RoomAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        }
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
        
        console.log(res.data);

        dispatch({
            type: RoomActionType.CREATE_ROOM_SUCCESS,
            payload: res.data
        });

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
        }
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
        }
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
        }
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