import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Movie from './pages/Movie';
import Home from './pages/Home';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <div className='container'>
      <UserProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/movie/:id' component={Movie} />
          <Redirect to='/' />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
