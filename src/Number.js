import { useContext } from 'react';
import { Context } from './App';

function Numbers() {
  const [state] = useContext(Context);
  
  return (
    <div>
      {state.numbers}
    </div>
  );
}

export default Numbers;
