import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../src/css/style.css'
import FormTemplate from './templates/FormTemplate';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Header from './pages/components/Header';
import ProjectManagerTemplate from './templates/ProjectManagerTemplate';
import ProjectManager from './pages/projectManager/ProjectManager';

export const history = createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <Switch>
        <FormTemplate path='/login' component={Login}/>
        <FormTemplate path='/register' component={Register}/>
        {/* <Route exact path={'/home'} component={Header}/> */}
        <ProjectManagerTemplate path='/home' component={ProjectManager}/>
      </Switch>
    </Router>
  );
}

export default App;
