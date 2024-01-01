import { RoomState, RoomAction } from "../actions-types/rooms";
import { RoomActionType } from "../actions-types/rooms/types";


const initialState: RoomState = {
    tournament: '',
    maxPlayers: 0,
    votesToSkip: 0,
    errors: []
}

const roomReducer = (state: RoomState = initialState, action: RoomAction) => {
  switch(action.type) {
    
    case RoomActionType.CREATE_UPDATE_ROOM_SUCCESS:
        return {
            ...state,
            tournament: action.payload.tournament,
            maxPlayers: action.payload.maxPlayers,
            votesToSkip: action.payload.votesToSkip,
        }

    case RoomActionType.CREATE_UPDATE_ROOM_FAIL:
        return {
            ...state,
            tournament: '',
            maxPlayers: 0,
            votesToSkip: 0,
            errors: action.errors
        }

    default:
        return state;

    }
}

export default roomReducer;