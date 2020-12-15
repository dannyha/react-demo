import { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import './App.css';
import Employees from './containers/Employees';
import Tests from './containers/Tests';

function App() {
 
  useEffect(() => {
    console.log('loaded app')
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/tests">Tests</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/employees"><Employees /></Route>
        <Route path="/tests"><Tests /></Route>
      </Switch>
    </div>
  );
}

export default App;