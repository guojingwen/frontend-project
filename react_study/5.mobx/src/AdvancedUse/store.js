import {action, makeObservable, observable} from 'mobx';

class AppState {
  constructor(){
    makeObservable(this)
  }
  @observable list = [];
  @action push = () => {
    this.list.push({id: Math.random()})
  }
}


export default window.cc = new AppState()