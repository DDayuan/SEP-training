import React from "react";
import "./Todoitem.css";

class Todoitem extends React.Component {
    state = {
        isEditing: false,
        editText: ""
    };
    handleEdit = () => {
        const { onEdit } = this.props;
        const { isEditing, editText } = this.state;
        const { todo } = this.props;

        if (isEditing) {
            onEdit(todo, editText)
        }

        this.setState(prevState => ({
            isEditing: !prevState.isEditing,
            editText: isEditing ? "" : todo.content
        }));
    }
    handleInputChange = event => {
        this.setState({
            editText: event.target.value
        });
    };
    render() {
        let arrow = "";

        const { todo, onDelete, onComplete } = this.props;
        switch (todo.completed) {
            case false:
                arrow = "===>>";
                break;
            case true:
                arrow = "<<===";
                break
        }
        return (
            <li className="todoitem">
                {
                    this.state.isEditing ? (
                        <input
                            className="text"
                            type="text"
                            value={this.state.editText}
                            onChange={this.handleInputChange} />
                    ) : (
                        <span className="edit-text">{todo.content}</span>
                    )
                }
                <div className="button">
                    <button onClick={() => this.handleEdit()}>{this.state.isEditing ? "Save" : "Edit"}</button>
                    <button onClick={() => onComplete(todo)}>{arrow}</button>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </div>
            </li>
        );
    }
}

export default Todoitem;