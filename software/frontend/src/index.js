import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom';
import Navbar from './assets/components/Navbar/navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './index.css';

ReactDOM.render((
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/about' component={About}></Route>
    </Switch>
  </BrowserRouter>
),
  document.getElementById('root')
);
