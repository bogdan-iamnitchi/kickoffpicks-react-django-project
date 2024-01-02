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

interface UserinRoomSuccessAction {
    type: RoomActionType.USER_IN_ROOM_SUCCESS,
    payload: any
}

interface UserinRoomFailAction {
    type: RoomActionType.USER_IN_ROOM_FAIL,
    errors: any
}

interface LeaveRoomSuccessAction {
    type: RoomActionType.LEAVE_ROOM_SUCCESS,
    payload: any
}

interface LeaveRoomFailAction {
    type: RoomActionType.LEAVE_ROOM_FAIL,
    errors: any
}

interface StartRoomSuccessAction {
    type: RoomActionType.START_ROOM_SUCCESS,
    payload: any
}

interface StartRoomFailAction {
    type: RoomActionType.START_ROOM_FAIL,
    errors: any
}

interface EndRoomSuccessAction {
    type: RoomActionType.END_ROOM_SUCCESS,
    payload: any
}

interface EndRoomFailAction {
    type: RoomActionType.END_ROOM_FAIL,
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
    | UserinRoomSuccessAction
    | UserinRoomFailAction
    | LeaveRoomSuccessAction
    | LeaveRoomFailAction
    | StartRoomSuccessAction
    | StartRoomFailAction
    | EndRoomSuccessAction
    | EndRoomFailAction


export type Errors = Array<{ [key: string]: string[] }>

export type RoomState = {
    tournament: string,
    maxPlayers: number,
    votesToSkip: number,
    
    isRoomCreated: boolean,
    isJoinedRoom: boolean,
    isHost: boolean,

    roomCode: string,
    roomStarted: boolean,

    errors: Errors,
}