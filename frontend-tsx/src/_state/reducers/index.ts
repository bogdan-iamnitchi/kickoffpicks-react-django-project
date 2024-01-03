import { combineReducers } from "redux";
import authReducer from "./authReducers";
import roomReducer from "./roomReducers";
import questionReducer from "./questionReducers";

const reducers = combineReducers({
    authState: authReducer,
    roomState: roomReducer,
    questionState: questionReducer
});
export default reducers;

export type State = ReturnType<typeof reducers>;