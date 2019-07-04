import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleInfo from './components/ArticleInfo';
import ArticleEdit from './components/ArticleEdit';

class App extends Component {

    render() {
       return (
         <Router>
           <Switch>
             <Route exact path='/' component={Home}/>
             <Route exact path='/articles/view/:articleId' component={ArticleInfo}/>
             <Route exact path='/articles' component={ArticleList}/>
             <Route exact path='/articles/category/:categoryId' component={ArticleList}/>
             <Route exact path='/articles/:articleId' component={ArticleEdit}/>
           </Switch>
         </Router>
       )
     }
}

export default App;
