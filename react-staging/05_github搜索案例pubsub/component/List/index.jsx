import React, { Component } from "react";
import Pubsub from "pubsub-js";
import "./index.css";

export default class List extends Component {
  state = {
    users: [], // 初始化users为数组
    isFirst: true, // 是否为初次载入页面
    isLoading: false,
    err: "",
  };

  componentDidMount() {
    this.token = Pubsub.subscribe("updateState", (_, data) => {
      this.setState(data);
    });
  }

  componentWillUnmount() {
    Pubsub.unsubscribe(this.token);
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {isFirst ? (
          <h2>Welcome, input keyword and search</h2>
        ) : isLoading ? (
          <h2>Loading......</h2>
        ) : err ? (
          <h2 style={{ color: "red" }}>{err}</h2>
        ) : (
          users.map((user, index) => {
            return (
              <div key={index} className="card">
                <a rel="noreferrer" href={user.html_url} target="_blank">
                  <img
                    alt="avatar"
                    src={user.avatar_url}
                    style={{ width: "100px" }}
                  />
                </a>
                <p className="card-text">{user.login}</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
