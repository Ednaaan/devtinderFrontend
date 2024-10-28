
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedreducer from "./feedSlice"
import connectionReducer from "./connectionSlice";
import requestReducer from "./RequestSlice";
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedreducer,
        connections: connectionReducer,
        requests: requestReducer,
    },
});

export default appStore;