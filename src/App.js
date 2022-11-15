
import './App.css';

import Todos from './components/Todos';
import { useState, useCallback } from "react";
import ComboBox from './components/ComboBox';
import MultiSelect from './components/MultiSelect'
import Tags from './components/Tags'


function App() {

  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>In the name of Allah.</h1>
        <ComboBox />
        <Tags/>
        {/* <MultiSelect/> */}
        {/* <Todos todos={todos} addTodo={addTodo} /> */}

        <hr />
        <div>
          Count: {count}
          <button onClick={increment}>+</button>
        </div>

        {/* <RenderCount /> */}

      </header>
    </div>
  );

}

export default App;

