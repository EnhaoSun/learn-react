import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Detail from "./Detail";

export default class Message extends Component {
  state = {
    messages: [
      {
        id: "01",
        title: "消息1",
      },
      {
        id: "02",
        title: "消息2",
      },
      {
        id: "03",
        title: "消息3",
      },
    ],
  };

  pushShow = (id, title) => {
    this.props.history.push(`/home/message/detail/${id}/${title}`);
  };

  replaceShow = (id, title) => {
    this.props.history.replace(`/home/message/detail/${id}/${title}`);
  };

  render() {
    const { messages } = this.state;
    return (
      <div>
        <ul>
          {messages.map((m) => {
            return (
              <li key={m.id}>
                {/* 向路由组件传递params参数 */}
                <Link to={`/home/message/detail/${m.id}/${m.title}`}>
                  {m.title}
                </Link>
                {/* 向路由组件传递search参数 */}
                {/* <Link to={`/home/message/detail?id=${m.id}&title=${m.title}`}>{m.title}</Link> */}
                {/* 向路由组件传递state参数 */}
                {/* <Link
                  to={{
                    pathname: "/home/message/detail",
                    state: { id: m.id, title: m.title },
                  }}
                >
                  {m.title}
                </Link> */}
                &nbsp;
                <button onClick={() => this.pushShow(m.id, m.title)}>
                  push查看
                </button>
                <button onClick={() => this.replaceShow(m.id, m.title)}>
                  replace查看
                </button>
              </li>
            );
          })}
        </ul>
        <hr />
        {/* 声明接收params参数 */}
        <Route path="/home/message/detail/:id/:title" component={Detail} />
        {/* search参数无需声明接收 */}
        {/* <Route path="/home/message/detail" component={Detail} /> */}
        {/* state参数无需声明接收 */}
        {/* <Route path="/home/message/detail" component={Detail} /> */}
      </div>
    );
  }
}
