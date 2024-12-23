import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer, applyMiddleware(thunk));
const persister = "Free";

export { persister, store };
export type RootState = ReturnType<typeof store.getState>;
