
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>In the name of Allah.</h1>

        <p>Please select your age:</p>
        <input type="radio" id="age1" name="age" value="30" />
        <label for="age1">0 - 30</label><br />
        <input type="radio" id="age2" name="age" value="60" />
        <label for="age2">31 - 60</label><br />
        <input type="radio" id="age3" name="age" value="100" />
        <label for="age3">61 - 100</label><br /><br />
        <input type="submit" value="Submit" />

      </header>
    </div>
  );
}

export default App;

