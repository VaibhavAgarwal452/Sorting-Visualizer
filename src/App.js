import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Bubble from './components/Bubble';
import Selection from './components/Selection';
import Insertion from './components/Insertion';
import Radix from './components/Radix';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <Layout />
      <div>
        <Switch>
          <Route path='/bubble'>
            <Bubble />
          </Route>

          <Route path='/selection'>
            <Selection />
          </Route>

          <Route path='/insertion'>
            <Insertion />
          </Route>

          <Route path='/Radix'>
            <Radix />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
