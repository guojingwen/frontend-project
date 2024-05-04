import React from 'react';
import {makeObservable, observable, action} from 'mobx';
import { Observer } from 'mobx-react';
class App extends React.Component {
    constructor(props) {
        super(props);
        makeObservable(this);
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.add();
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    @observable
    count = 0;

    @action
    add = () => {
        ++this.count;
    }
    @action
    reset = () => {
        this.count = 0;
    }
    render() {
        return <Observer>
            {
                () => <div>
                    <p>{this.count}</p>
                    <button onClick={this.reset}>reset</button>
                </div>
            }
        </Observer>
    }
}

export default App;
