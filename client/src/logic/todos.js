let id = 0;
const nextId = () => ++id;

const INITIAL_STATE = [];

const ADD_TODO = 'ADD_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

const addTodo = task => ({
  type: ADD_TODO,
  payload: {
    id: nextId(),
    task,
  },
});

const updateTodo = (id, task) => ({
  type: UPDATE_TODO,
  payload: {
    id,
    task,
  },
});

const removeTodo = id => ({
  type: REMOVE_TODO,
  payload: id,
});

const todosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.payload);

    case UPDATE_TODO:
      return state.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo;
        }

        return {
          ...todo,
          task: action.payload.task,
        };
      });

    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
};

export { addTodo, updateTodo, removeTodo, todosReducer };
