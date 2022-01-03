import { createContext, useContext, useReducer } from 'react';
import Numbers from './Number';

const initState = {
  numbers: 0
}

const add_todo = 'add_todo';
const sub_todo = 'sub_todo';

const reducer = function(state, action) {
  switch (action) {
    case add_todo:
      return {...state, numbers: state.numbers + 1};
    case sub_todo:
      return {...state, numbers: state.numbers - 1};
    default:
      throw new Error(`Action ${action} is incorrect`);
  }
}

const logger = function (reducer) {
  return (previousState, dispatch) => {
    console.group(dispatch);
    console.log('previousState: ', previousState);
    const nextState = reducer(previousState, dispatch);
    console.log('nextState: ', nextState);
    console.groupEnd();
    return nextState;
  }
}

export const Context = createContext();

export function ContextProviders({ children }) {
  const [state, dispatch] = useReducer(logger(reducer), initState);
  
  return <Context.Provider value={[state, dispatch]}>
    {children}
  </Context.Provider>
}

function App() {
  const [state, dispatch] = useContext(Context);
  
  return (
    <div>
      <Numbers/>
      <button onClick={() => dispatch(add_todo)}>+</button>
      <button onClick={() => dispatch(sub_todo)}>-</button>
    </div>
  );
}

export default App;
