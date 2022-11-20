import React, { Component } from 'react'

const DetailData = [
  {
    id: '01', content: '你好，世界'
  },
  {
    id: '02', content: '你好，硅谷'
  },
  {
    id: '03', content: '你好，我自己'
  }
]

export default class Detail extends Component {
  render() {
    // 接收params参数
    const { id, title } = this.props.match.params
    const findResult = DetailData.find((obj) => {
      return obj.id == id
    })
    return (
      <ul>
        <li>ID: {id}</li>
        <li>Title: {title}</li>
        <li>Content: {findResult.content}</li>
      </ul>
    )
  }
}