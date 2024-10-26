
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedreducer from "./feedSlice"
import connectionReducer from "./connectionSlice";
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedreducer,
        connections: connectionReducer,
    },
});

export default appStore;