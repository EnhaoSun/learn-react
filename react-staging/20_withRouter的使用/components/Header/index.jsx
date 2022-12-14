import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  goForward = () => {
    this.props.history.goForward();
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="page-header">
        <h2>React Router Demo</h2>
        <button onClick={() => this.goBack()}>ει</button>
        &nbsp;
        <button onClick={() => this.goForward()}>εθΏ</button>
      </div>
    )
  }
}

export default withRouter(Header)