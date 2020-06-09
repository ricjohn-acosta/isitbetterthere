import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/index";

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

export default wrapper;
