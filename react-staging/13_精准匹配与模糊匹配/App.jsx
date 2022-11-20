import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header"
import MyNavLink from "./components/MyNavLink";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 模糊匹配 /home/a/b */}
              <MyNavLink to="/home">Home</MyNavLink>
              <MyNavLink to="/about">About</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Switch>
                  {/* 严格匹配 */}
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/about" component={About} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
