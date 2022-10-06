import React, { Component } from "react";

export default class RefClassUasge extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }
  render() {
    return <div>
      <input type="text" ref={this.inputRef}/>
      <button onClick={() => this.inputRef.current.focus()}>focus</button>
    </div>
  }
}
