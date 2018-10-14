const loggerMiddleware = ({ getState }) => next => action => {
  console.group(action.type);
  console.info('payload:', action.payload);
  next(action);
  console.log('state:', getState());
  console.groupEnd();
};

export default loggerMiddleware;
