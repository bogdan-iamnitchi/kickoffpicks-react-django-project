import { combineReducers } from "redux";
import authReducer from "./authReducers";
import roomReducer from "./roomReducers";

const reducers = combineReducers({
    authState: authReducer,
    roomState: roomReducer
});
export default reducers;

export type State = ReturnType<typeof reducers>;