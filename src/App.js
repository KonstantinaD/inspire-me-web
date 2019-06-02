import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleInfo from './components/ArticleInfo';

class App extends Component {

    render() {
       return (
         <Router>
           <Switch>
             <Route exact path='/' component={Home}/>
             <Route exact path='/articles/:articleId' component={ArticleInfo}/>
             <Route exact path='/articles' component={ArticleList}/>
             <Route exact path='/articles/category/:categoryId' component={ArticleList}/>
           </Switch>
         </Router>
       )
     }
}

export default App;
