import React, { Component } from "react";
import "./index.css";

export default class Footer extends Component {
  handelCheckAll = (event) => {
    this.props.checkAllTodo(event.target.checked);
  };

  handelClearAllDone = () => {
    this.props.clearAllDone();
  };

  render() {
    const { todos } = this.props;
    const total = todos.length;
    const finished = todos.reduce((pre, todo) => {
      return todo.done ? pre + 1 : pre;
    }, 0);
    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            onChange={this.handelCheckAll}
            checked={finished === total && total !== 0 ? true : false}
          />
        </label>
        <span>
          <span>已完成{finished}</span> / 全部{total}
        </span>
        <button onClick={this.handelClearAllDone} className="btn btn-danger">
          清除已完成任务
        </button>
      </div>
    );
  }
}
