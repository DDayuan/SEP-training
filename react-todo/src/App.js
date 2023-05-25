import API from "./API";
import './App.css';
import React from "react";
import ReactDOM from 'react-dom/client';

class Header extends React.Component {
  render() {
    return <h1 className="header">My Todo List</h1>;
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <li>
        <span>
          {this.props.content}
        </span>
        <button 
          className="delete-btn"
          onClick={()=>this.props.handleDelete(this.props.id)}
        >
          delete
        </button>
      </li>
    )
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      todos: []
    }
    this.getNewData();
  }

  getNewData = () => {
    API.getTodos().then(data => this.setState({todos:data}));
  }

  handleSubmit = (event) => {
    API.postTodos({content: this.state.input}).then(()=>
    this.getNewData
    )
    this.setState({input: ''})
  }

  handleDelete = (id) => {
    API.deleteTodos(id).then(() => this.getNewData());
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input 
            className="todo-input"
            value={this.state.input}
            onChange={(event)=>{
              this.setState({input: event.target.value})
            }}
          />
          <button className="submit-btn" type="submit">
            submit
          </button>
        </form>
        <div className="todo-list-container">
          <ul>
            {this.state.todos.map(({id, content}) => (
              <ListItem
                key = {id}
                id = {id}
                content = {content}
                handleDelete={this.handleDelete}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

}

class App extends React.Component {
  render () {
    return (
      <>
        <Header/>
        <Form/>
      </>
    )
  }
}



export default App;
