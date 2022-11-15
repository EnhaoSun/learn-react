import React, { Component } from "react";
import "./App.css";
import Header from "./component/Header";
import List from "./component/List";
import Footer from "./component/Footer";

export default class App extends Component {
  // 初始化状态
  state = {
    todos: [
      { id: "001", name: "吃饭", done: true },
      { id: "002", name: "睡觉", done: false },
      { id: "003", name: "写代码", done: false },
    ],
  };

  //状态在哪里，操作状态的方法就在哪里

  addTodo = (todoObj) => {
    const { todos } = this.state;
    const newTodos = [todoObj, ...todos];
    this.setState({ todos: newTodos });
  };

  updateTodo = (id, done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) return { ...todoObj, done };
      else return todoObj;
    });

    this.setState({ todos: newTodos });
  };

  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todoObj) => {
      return todoObj.id !== id;
    });

    this.setState({ todos: newTodos });
  };

  checkAllTodo = (done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todoObj) => {
      return { ...todoObj, done: done };
    });

    this.setState({ todos: newTodos });
  };

  clearAllDone = () => {
    const { todos } = this.state;
    const newTodos = todos.filter((todoObj) => {
      return !todoObj.done;
    });

    this.setState({ todos: newTodos });
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            todos={todos}
          />
          <Footer clearAllDone={this.clearAllDone} checkAllTodo={this.checkAllTodo} todos={todos} />
        </div>
      </div>
    );
  }
}
