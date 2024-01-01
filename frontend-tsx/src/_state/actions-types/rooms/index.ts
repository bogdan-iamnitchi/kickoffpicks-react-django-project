import { RoomActionType } from "./types"

interface CreateUpdateRoomSuccessAction {
    type: RoomActionType.CREATE_UPDATE_ROOM_SUCCESS,
    payload: any
}

interface CreateUpdateRoomFailAction {
    type: RoomActionType.CREATE_UPDATE_ROOM_FAIL,
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


export type RoomAction = 
    CreateUpdateRoomSuccessAction 
    | CreateUpdateRoomFailAction 
    | JoinRoomSuccessAction 
    | JoinRoomFailAction


export type Errors = Array<{ [key: string]: string[] }>

export type RoomState = {
    tournament: string,
    maxPlayers: number,
    votesToSkip: number,
    errors: Errors
}