import React from 'react';
import {makeObservable, observable, action} from 'mobx';
import { Observer } from 'mobx-react';
class App extends React.Component {
    constructor(props) {
        super(props);
        makeObservable(this);
    }
    @observable
    count = 0;

    @action
    add = () => {
        ++this.count;
    }
    render() {
        return <Observer>
            {
                () => <div>
                    <p>{this.count}</p>
                    <button onClick={this.add}>ADD</button>
                </div>
            }
        </Observer>
    }
}

export default App;
