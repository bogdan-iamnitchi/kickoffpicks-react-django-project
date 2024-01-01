import { RoomActionType } from "./types"

interface CreateUpdateRoomSuccessAction {
    type: RoomActionType.CREATE_ROOM_SUCCESS,
    payload: any
}

interface CreateUpdateRoomFailAction {
    type: RoomActionType.CREATE_ROOM_FAIL,
    errors: any
}

interface UpdateRoomSuccessAction {
    type: RoomActionType.UPDATE_ROOM_SUCCESS,
    payload: any
}

interface UpdateRoomFailAction {
    type: RoomActionType.UPDATE_ROOM_FAIL,
    errors: any
}

interface JoinRoomSuccessAction {
    type: RoomActionType.JOIN_ROOM_SUCCESS,
    payload: any
}

interface JoinRoomFailAction {
    type: RoomActionType.JOIN_ROOM_FAIL,
    errors: any
}

interface LoadRoomSuccessAction {
    type: RoomActionType.LOAD_ROOM_DETAILS_SUCCESS,
    payload: any
}

interface LoadRoomFailAction {
    type: RoomActionType.LOAD_ROOM_DETAILS_FAIL,
    errors: any
}


export type RoomAction = 
    CreateUpdateRoomSuccessAction 
    | CreateUpdateRoomFailAction 
    | UpdateRoomSuccessAction
    | UpdateRoomFailAction
    | JoinRoomSuccessAction 
    | JoinRoomFailAction
    | LoadRoomSuccessAction
    | LoadRoomFailAction
    


export type Errors = Array<{ [key: string]: string[] }>

export type RoomState = {
    tournament: string,
    maxPlayers: number,
    votesToSkip: number,
    
    roomCode: string,
    isRoomCreated: boolean,
    isJoinedRoom: boolean,

    errors: Errors,
}