import { combineReducers } from 'redux';
import { todosReducer as todos } from '../logic/todos';

export default combineReducers({
  todos,
});
