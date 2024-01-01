import { RoomState, RoomAction } from "../actions-types/rooms";
import { RoomActionType } from "../actions-types/rooms/types";


const initialState: RoomState = {
    tournament: 'Liga1 - Superliga',
    maxPlayers: 3,
    votesToSkip: 2,

    roomCode: '',
    isRoomCreated: false,
    isJoinedRoom: false,

    errors: []
}

const roomReducer = (state: RoomState = initialState, action: RoomAction) => {
  switch(action.type) {
    
    case RoomActionType.CREATE_ROOM_SUCCESS:
        return {
            ...state,
            tournament: action.payload.tournament,
            maxPlayers: action.payload.max_players,
            votesToSkip: action.payload.votes_to_skip,

            isRoomCreated: true,
            roomCode: action.payload.code,
        }

    case RoomActionType.UPDATE_ROOM_SUCCESS:
        return {
            ...state,
            maxPlayers: action.payload.max_players,
            votesToSkip: action.payload.votes_to_skip,
        }

    case RoomActionType.JOIN_ROOM_SUCCESS:
        return {
            ...state,
            isJoinedRoom: true,
        }

    case RoomActionType.CREATE_ROOM_FAIL:
    case RoomActionType.JOIN_ROOM_FAIL:
        return {
            ...state,
            tournament: initialState.tournament,
            maxPlayers: initialState.maxPlayers,
            votesToSkip: initialState.votesToSkip,

            roomCode: '',
            isRoomCreated: false,
            isJoinedRoom: false,

            errors: action.errors
        }

    case RoomActionType.LOAD_ROOM_DETAILS_SUCCESS:
        return {
            ...state,
            roomCode: action.payload.code,
            tournament: action.payload.tournament,
            maxPlayers: action.payload.max_players,
            votesToSkip: action.payload.votes_to_skip,

            isHost: action.payload.is_host,
        }
    
    case RoomActionType.LOAD_ROOM_DETAILS_FAIL:
    case RoomActionType.UPDATE_ROOM_FAIL:
        return {
            ...state,
            errors: action.errors
        }
    default:
        return state;

    }
}

export default roomReducer;