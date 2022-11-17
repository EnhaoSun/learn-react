import React, { Component } from "react";
import axios from "axios";
import "./index.css";

export default class Search extends Component {
  search = () => {
    // 获取用户输入
    const {
      keyWordElem: { value: keyWord },
    } = this;

    // 发送请求前通知App更新状态
    this.props.updateState({ isFirst: false, isLoading: true });

    // 发送网络请求
    // axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
    axios.get(`/search/users?q=${keyWord}`).then(
      (response) => {
        // 请求成功后通知App更新状态
        this.props.updateState({
          isLoading: false,
          users: response.data.items,
        });
      },
      (error) => {
        this.props.updateState({
          isLoading: false,
          err: error.message,
        });
      }
    );
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
