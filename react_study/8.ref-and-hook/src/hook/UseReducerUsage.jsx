import React, {useReducer} from 'react';

export default function UseReducerUsage() {
  function counter (state, action) {
    switch(action.type) {
      case 'ADD':
        return state + 1;
      default :
        return state;
    }
  }
  const [state, dispatch] = useReducer(counter, 0);

  return <div>
    <p>{state}</p>
    <button onClick={() => dispatch({type: 'ADD'})}>ADD</button>
  </div>
}
