import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import { createBrowserHistory } from 'history';
import '../src/css/style.css'
import FormTemplate from './templates/FormTemplate';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

export const history = createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <Switch>
        <FormTemplate path='/login' component={Login}/>
        <FormTemplate path='/register' component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
