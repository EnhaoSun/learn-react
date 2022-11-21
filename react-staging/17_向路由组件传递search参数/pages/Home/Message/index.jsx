import React, { Component } from "react";
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
  state = {
    messages: [
      {
        id: '01', title: '消息1'
      },
      {
        id: '02', title: '消息2'
      },
      {
        id: '03', title: '消息3'
      },
    ]
  }
  render() {
    const { messages } = this.state
    return (
      <div>
        <ul>
          {
            messages.map((m) => {
              return (
                <li key={m.id}>
                  {/* 向路由组件传递params参数 */}
                  {/* <Link to={`/home/message/detail/${m.id}/${m.title}`}>{m.title}</Link> */}
                  {/* 向路由组件传递search参数 */}
                  <Link to={`/home/message/detail?id=${m.id}&title=${m.title}`}>{m.title}</Link>
                </li>
              )
            })
          }
        </ul>
        <hr />
        {/* 声明接收params参数 */}
        {/* <Route path="/home/message/detail/:id/:title" component={Detail} /> */}

        {/* search参数无需声明接收 */}
        <Route path="/home/message/detail" component={Detail} />

      </div>
    )
  }
}
