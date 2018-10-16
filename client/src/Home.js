import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, removeTodo } from './logic/todos';
import logo from './logo.svg';
import './Home.css';

class Home extends Component {
  state = {
    newTask: '',
  };

  addTodo = () => {
    this.props.addTodo(this.state.newTask);
    this.setState({
      newTask: '',
    });
  };

  updateNewTask = e => {
    this.setState({
      newTask: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            CRA + SSR
          </p>
        </header>

        <div>
          <input
            type="text"
            value={this.state.newTask}
            onChange={this.updateNewTask}
          />

          <button
            disabled={this.state.newTask.length === 0}
            onClick={this.addTodo}
          >
            +
          </button>
        </div>

        <ul>
          <ol>
            {this.props.todos.map(todo => (
              <li key={todo.id}>{todo.task}</li>
            ))}
          </ol>
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    todos: state.todos,
  }),

  {
    addTodo,
    updateTodo,
    removeTodo,
  }
)(Home);
