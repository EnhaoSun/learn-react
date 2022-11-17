import React, { Component } from "react";
import List from "./component/List";
import Search from "./component/Search";

export default class App extends Component {
  state = {
    users: [], // 初始化users为数组
    isFirst: true, // 是否为初次载入页面
    isLoading: false,
    err: "",
  };

  updateState = (stateObj) => {
    this.setState(stateObj);
  };

  render() {
    return (
      <div className="container">
        <Search updateState={this.updateState} />
        <List {...this.state} />
      </div>
    );
  }
}
