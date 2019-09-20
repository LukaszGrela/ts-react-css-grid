import { createStore, applyMiddleware, Dispatch } from 'redux';
// import thunk, { ThunkDispatch } from 'redux-thunk';
// import { routerMiddleware } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from './createRootReducer';

const rootReducer = createRootReducer();

export type AppState = ReturnType<typeof rootReducer>;


const composeEnhancers = composeWithDevTools({});

const store = createStore(rootReducer, composeEnhancers());

export default store;
