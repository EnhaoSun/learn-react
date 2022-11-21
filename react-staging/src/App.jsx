import React, { Component } from 'react'
import { Button } from 'antd'
import { WechatOutlined } from '@ant-design/icons'

export default class App extends Component {
  render() {
    return (
      <div>
        App...
        <Button type="primary">点我</Button>
        &nbsp;
        <Button type="Link">点我</Button>
        &nbsp;
        <Button >点我</Button>
        &nbsp;
        <WechatOutlined />
      </div>
    )
  }
}
