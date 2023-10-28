import { combineReducers } from "redux";
import { btFormReducer } from "./slice";

export const rootReducer = combineReducers({
    btForm: btFormReducer,
})