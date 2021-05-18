import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'
import {useDispatch} from "react-redux";

// CREATING INITIAL STORE
// export default function getStore(initialState) {
//   const store = createStore(
//     reducers,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware))
//   )

//   // IF REDUCERS WERE CHANGED, RELOAD WITH INITIAL STATE
//   if (module.hot) {
//     module.hot.accept('./reducers/index', () => {
//       const createNextReducer = require('./reducers/index').default

//       store.replaceReducer(createNextReducer(initialState))
//     })
//   }

//   return store
// }

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initStore = () => {
  return createStore(reducers, bindMiddleware([thunkMiddleware]));
};

const wrapper = createWrapper(initStore);

export const useThunkDispatch = () => useDispatch();

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}