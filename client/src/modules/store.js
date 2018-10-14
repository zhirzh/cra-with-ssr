import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducer';

function configureStore({ state, middlewares = [], enhancers = [] } = {}) {
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = compose(middlewareEnhancer, ...enhancers);

  const store = createStore(rootReducer, state, composedEnhancers);

  return store;
}

export default configureStore;
