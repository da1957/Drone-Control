import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import About from './pages/About/About';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/about' component={About}></Route>
        </Switch>
    );
}

export default Main