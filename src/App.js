import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppState from './context/appContext/appState';

import SignUp from './components/signup';
import SignIn from './components/signin'
import Dashboard from './components/dashboard';
import NotFound from './components/notFound';

const App = () => (
  <AppState>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </AppState>
);
export default App;
