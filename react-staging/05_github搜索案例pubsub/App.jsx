import React, { Component } from "react";
import List from "./component/List";
import Search from "./component/Search";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Search />
        <List />
      </div>
    );
  }
}
