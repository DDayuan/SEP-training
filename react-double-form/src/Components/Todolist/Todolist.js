import React from "react";
import { deleteTodo, getTodos, postTodo, updateTodo } from "../../api/TodoApi";
import Todoitem from "./Todoitem/Todoitem";
import { withTodos } from "../../hoc/withTodo";
import "./Todolist.css";

//import "./Todolist.css";

class Todolist extends React.Component {
  state = {
    //todos: [],
    inputValue: "",
    // completed: [],
    // pending: []
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      content: this.state.inputValue,
      completed: false,
    };
    postTodo(newTodo).then((todo) => {
      this.props.addTodo(todo);
      this.setState({
        //todos: [...this.state.todos, todo],
        inputValue: "",
      });
    });
  };

  handleInputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleDelete = (id) => {
    deleteTodo(id).then(() => {
      // this.setState({
      //   //todos: this.state.todos.filter((todo) => id !== todo.id),
      // }),
      this.props.deleteTodo(id);
    });
  };

  handleEditTodo = (todo, updatedText) => {
    updateTodo({ ...todo, content: updatedText }).then((res) => {
      // this.setState({
      //     todos: this.state.todos.map((item) => {
      //         if (item.id === res.id) {
      //             return { ...res };
      //           } else {
      //             return item;
      //           }
      //     })
      // })
      this.props.updateTodo(res)
    })
  }

  handleComplete = (todo) => {
    console.log("complete");
    updateTodo({ ...todo, completed: !todo.completed }).then((res) => {
      // this.setState({
      //   todos: this.state.todos.map((item) => {
      //     if (item.id === res.id) {
      //       return { ...res };
      //     } else {
      //       return item;
      //     }
      //   }),
      // });
      this.props.updateTodo(res);
    });
  };

  render() {
    const { todos } = this.props;
    const pendingTodos = todos.filter((todo) => todo.completed === false);
    const completedTodos = todos.filter((todo) => todo.completed === true);

    return (
      <div className="todolist">
        <form className="input-part">
          {/* two way binding */}
          <input
            className="todo-input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button className="submit-btn" onClick={this.handleSubmit}>
            submit
          </button>
        </form>
        <div className="todolist-list-container">
          <ul className="todolist-list">
            <p className="pending">Pending</p>
            {pendingTodos.map((todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                onEdit={this.handleEditTodo}
                onDelete={this.handleDelete}
                onComplete={this.handleComplete}
              />
            ))}
          </ul>
          <ul className="todolist-list">
            <p className="completed">Completed</p>
            {completedTodos.map((todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                onEdit={this.handleEditTodo}
                onDelete={this.handleDelete}
                onComplete={this.handleComplete}
              />
            ))}
          </ul>
        </div>
        {/* <ul className="todolist-list">
          <p>Pending</p>
          {pendingTodos.map((todo) => (
            <Todoitem
              key={todo.id}
              todo={todo}
              onEdit={this.handleEditTodo}
              onDelete={this.handleDelete}
              onComplete={this.handleComplete}
            />
          ))}
        </ul>
        <ul className="todolist-list">
          <p>Completed</p>
          {completedTodos.map((todo) => (
            <Todoitem
              key={todo.id}
              todo={todo}
              onEdit={this.handleEditTodo}
              onDelete={this.handleDelete}
              onComplete={this.handleComplete}
            />
          ))}
        </ul> */}
      </div>
    );
  }

  // componentDidMount() {
  //   getTodos().then((todos) => {
  //     this.setState({
  //       todos,
  //     });
  //   });
  // }
}

export default withTodos(Todolist);