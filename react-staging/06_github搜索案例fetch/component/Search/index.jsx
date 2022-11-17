import React, { Component } from "react";
// import axios from "axios";
import Pubsub from "pubsub-js";
import "./index.css";

export default class Search extends Component {
  search = async () => {
    // 获取用户输入
    const {
      keyWordElem: { value: keyWord },
    } = this;

    // 发送请求前通知List更新状态
    Pubsub.publish("updateState", { isFirst: false, isLoading: true });

    // 发送网络请求
    try {
      const response = await fetch(`/search/users2?q=${keyWord}`);
      const data = await response.json();
      Pubsub.publish("updateState", {
        isLoading: false,
        users: data.items,
      });
    } catch (error) {
      Pubsub.publish("updateState", {
        isLoading: false,
        err: error.message,
      });
    }
  };
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            ref={(c) => (this.keyWordElem = c)}
            type="text"
            placeholder="enter the name you search"
          />
          &nbsp;
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    );
  }
}
