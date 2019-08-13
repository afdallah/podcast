import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'

const initState = {
    nowPlaying: 'http://podsummit.com/wp-content/uploads/2017/03/In-Suspense.mp3'
}
// create a simple reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_PODCAST':
            return {...state, nowPlaying: action.payload};
        default:
            return state
    }
};

// create a store creator
const makeStore = (initialState = initState) => {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware())
    );
};
export default makeStore;