import { RoomState, RoomAction } from "../actions-types/rooms";
import { RoomActionType } from "../actions-types/rooms/types";


const initialState: RoomState = {
    tournament: 'Liga1 - Superliga',
    maxPlayers: 3,
    votesToSkip: 2,

    isRoomCreated: false,
    isJoinedRoom: false,
    isHost: false,

    roomCode: '',
    roomStarted: false,

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
            isJoinedRoom: true,

            roomCode: action.payload.code,
        }

    case RoomActionType.UPDATE_ROOM_SUCCESS:
        return {
            ...state,
            maxPlayers: action.payload.max_players,
            votesToSkip: action.payload.votes_to_skip,
        }

    case RoomActionType.USER_IN_ROOM_SUCCESS:
        return {
            ...state,
            isJoinedRoom: true,
            roomCode: action.payload.code,
        }

    case RoomActionType.JOIN_ROOM_SUCCESS:
        return {
            ...state,
            isJoinedRoom: true,
        }

    case RoomActionType.LOAD_ROOM_DETAILS_SUCCESS:
        return {
            ...state,
            tournament: action.payload.tournament,
            maxPlayers: action.payload.max_players,
            votesToSkip: action.payload.votes_to_skip,

            roomCode: action.payload.code,
            roomStarted: action.payload.started,

            isHost: action.payload.is_host,
        }
    
    case RoomActionType.START_ROOM_SUCCESS:
        return {
            ...state,
            roomStarted: true,
        }
    
    case RoomActionType.END_ROOM_SUCCESS:
        return {
            ...state,
            roomStarted: false,
        }

    case RoomActionType.END_ROOM_SUCCESS:
        return {
            ...state,
            roomStarted: action.payload.started,
        }

    case RoomActionType.LEAVE_ROOM_SUCCESS:
        return {
            ...state,
            tournament: initialState.tournament,
            maxPlayers: initialState.maxPlayers,
            votesToSkip: initialState.votesToSkip,

            isRoomCreated: false,
            isJoinedRoom: false,
            isHost: false,
            
            roomCode: '',
            roomStarted: false,

            errors: []
        }

    case RoomActionType.USER_IN_ROOM_FAIL:
    case RoomActionType.CREATE_ROOM_FAIL:
    case RoomActionType.JOIN_ROOM_FAIL:
    case RoomActionType.LEAVE_ROOM_FAIL:
    case RoomActionType.LOAD_ROOM_DETAILS_FAIL:
    case RoomActionType.UPDATE_ROOM_FAIL:
        return {
            ...state,
            tournament: initialState.tournament,
            maxPlayers: initialState.maxPlayers,
            votesToSkip: initialState.votesToSkip,

            isRoomCreated: false,
            isJoinedRoom: false,
            isHost: false,
            
            roomCode: '',
            roomStarted: false,

            errors: action.errors
        }

    default:
        return state;

    }
}

export default roomReducer;