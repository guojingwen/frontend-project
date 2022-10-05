import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// react-router-dom < 6 的用法
export default class RouterPage extends Component {
  render() {
    return (
      <div>
        <h3>RouterPage</h3>
        <Router>
          <Link to="/">首页</Link>&nbsp;
          <Link to="/user">用户中心</Link>&nbsp;
          <Link to="/abc">404</Link>

          <Switch>
            {/*Route渲染优先级: children>component>render*/}
            <Route
              exact
              path="/"
              render={() => <div>render</div>}
            //   component={HomePage}
            //   children={() => <div>children</div>}
            />
            <Route path="/user" component={UserPage} />
            <Route component={EmptyPage} /> {/* 要用Switch包裹才行 */}
          </Switch>
        </Router>
      </div>
    );
  }
}

class HomePage extends Component {
  render() {
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    );
  }
}

class UserPage extends Component {
  render() {
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}

class EmptyPage extends Component {
  render() {
    return (
      <div>
        <h3>EmptyPage-404</h3>
      </div>
    );
  }
}
