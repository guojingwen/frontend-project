import {makeObservable, observable, action} from "mobx";
import {observer} from 'mobx-react'
import { useEffect } from "react";

class AppState  {
    timer = 0;
    constructor() {
        makeObservable(this, {
            timer: observable,
            reset: action,
            add: action
        });
    }
    add = () => {
        this.timer += 1;
    }
    reset = () => {
        this.timer = 0;
    }
}
const store = new AppState();


const TimerComp = observer(({store}) => {
  return <div>
    <p>{store.timer}</p>
    <button onClick={store.reset}>reset</button>
  </div>
})

export default function TimerView() {
  useEffect(() => {
    const timer = setInterval(() => {
      store.add();
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])
  return <div>
    <TimerComp store={store}></TimerComp>
  </div>
}