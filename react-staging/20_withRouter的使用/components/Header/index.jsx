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
        <button onClick={() => this.goBack()}>后退</button>
        &nbsp;
        <button onClick={() => this.goForward()}>前进</button>
      </div>
    )
  }
}

export default withRouter(Header)