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
    console.log(body);

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/rooms-api/create-room/`,
            body,
            config
        );
        
        console.log(res);
        
        dispatch({
            type: RoomActionType.CREATE_UPDATE_ROOM_SUCCESS,
            payload: res.data
        });

    } catch (err) {
       console.log(err);
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: RoomActionType.CREATE_UPDATE_ROOM_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: RoomActionType.CREATE_UPDATE_ROOM_FAIL,
                errors: []
            });
        }
    }

};