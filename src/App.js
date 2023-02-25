import logo from './logo.svg';
import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import { createBrowserHistory } from 'history';
import '../src/css/style.css'

export const history = createBrowserHistory()


function App() {
  
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={'/home'} component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
