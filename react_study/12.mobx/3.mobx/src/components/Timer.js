import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class AppState {
    timer = 0;
  
    constructor() {
      makeAutoObservable(this);
      setInterval(() => {
        this.timer += 1;
      }, 1000);
    }
  
    reset = () => {
      this.timer = 0;
    };
  }

const TimerComp = observer(({store}) => {
    return <button onClick={store.reset}>Seconds passed: {store.timer}</button>
})

export default function TimerView() {
    return <div>
        <TimerComp store={new AppState()}></TimerComp>
    </div>
}


