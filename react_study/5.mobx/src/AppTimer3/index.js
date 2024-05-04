import React from 'react'
import {makeObservable, observable, action} from "mobx";
import {observer, inject, Provider} from 'mobx-react'


class AppState  {
    timer = 0;
    constructor() {
        makeObservable(this, {
            timer: observable,
            reset: action,
            add: action
        });
        setInterval(() => {
            this.add();
        }, 1000)
    }
    add = () => {
        this.timer += 1;
    }
    reset = () => {
        this.timer = 0;
    }
}
const store = new AppState();

@inject('store')
@observer
class TimerComp extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {store} = this.props
        return <div>
            <p>{store.timer}</p>
            <button onClick={store.reset}>reset</button>
        </div>
    }
}

export default function TimerView() {
    return <Provider store={store}>
        <TimerComp></TimerComp>
    </Provider>
}
