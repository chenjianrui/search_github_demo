import React from 'react';

import { Dashboard, Login } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Dashboard}/>
      <Route path="/login" component={Login}/>
    </Router>
  );
}

export default App;
