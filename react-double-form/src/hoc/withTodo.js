import React, { Component } from "react";
import { getTodos } from "../api/TodoApi";

export const withTodos = (WrappedComponent) => {
    return class NewComponent extends React.Component {
        state = {
            todos: [],
        };

        fetchTodos = () => {
            getTodos().then((todos) => {
              this.setState({ todos });
            });
        };

        addTodo = (newTodo) => {
            this.setState((prevState) => ({
                todos: [...this.state.todos, newTodo]
            }));
        };

        deleteTodo = (id) => {
            this.setState((prevState) => ({
                todos: prevState.todos.filter((todo) => todo.id !== id),
            }));
        };

        updateTodo = (updatedTodo) => {
            this.setState((prevState) => ({
                todos: prevState.todos.map((todo) =>
                  todo.id === updatedTodo.id ? updatedTodo : todo
                ),
              }));
        }

        componentDidMount() {
            // getTodos().then((todos) => {
            //     this.setState({
            //         todos,
            //     });
            // });
            this.fetchTodos();
        }
        render () {
            const {todos} = this.state;

            return (
                <WrappedComponent 
                    {...this.props}
                    todos = {todos}
                    addTodo = {this.addTodo}
                    deleteTodo = {this.deleteTodo}
                    updateTodo = {this.updateTodo}
                />
            );
        }
    };
};