import React from 'react'
import {makeObservable, observable, action} from "mobx";
import {useObserver} from 'mobx-react'


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
const context = React.createContext({store})
const useStores = () => React.useContext(context)


function TimerComp() {
    const {store} = useStores()
    return useObserver(() => <div>
        <p>{store.timer}</p>
        <button onClick={store.reset}>reset</button>
    </div>)
}

export default function TimerView() {
    return <div>
        <TimerComp></TimerComp>
    </div>
}
