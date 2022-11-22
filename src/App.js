
import './App.css';

// import Todos from './components/Todos';
import { useState, useCallback } from "react";
// import ComboBox from './code-samples/ComboBox';
import MultiSelect from './components/MultiSelect'
// import Tags from './components/Tags'
// import SubmitForm from './components/SubmitForm'
import IndividualAutoComplete from './components/IndividualAutoComplete'
import CustomDataTable from './components/CustomDataTable'


function App() {

  // const [count, setCount] = useState(0);
  // const [todos, setTodos] = useState([]);

  // const increment = () => {
  //   setCount((c) => c + 1);
  // };

  // const addTodo = useCallback(() => {
  //   setTodos((t) => [...t, "New Todo"]);
  // }, [todos]);

  const onChangeValueFunction = useCallback((colorName) => { console.log(colorName); }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>In the name of Allah.</h1>
        <IndividualAutoComplete
          baseURL={"http://localhost:5000/getColors"}
          onChangeValueFunction={onChangeValueFunction}
        />

        <hr />

        <MultiSelect
          baseURL={"http://localhost:5000/getColors"}
          onChangeValueFunction={onChangeValueFunction}
        />

        <CustomDataTable />
        {/* <Todos todos={todos} addTodo={addTodo} /> */}

        {/* <hr /> */}
        {/* <div>
          Count: {count}
          <button onClick={increment}>+</button>
        </div> */}

        {/* <RenderCount /> */}

      </header>
    </div>
  );

}

export default App;

