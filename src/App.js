import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ArticleList from './components/ArticleList';
import ArticleInfo from './components/ArticleInfo';
import ArticleEdit from './components/ArticleEdit';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import ComingSoon from './components/ComingSoon';

class App extends Component {

    render() {
       return (
         <Router>
           <Switch>
             <Route exact path='/' component={Home}/>
             <Route exact path='/articles/view/:articleId' component={ArticleInfo}/>
             <Route exact path='/articles' component={ArticleList}/>
             <Route exact path='/articles/category/:categoryId' component={ArticleList}/>
             <Route exact path='/articles/tags/:tagId' component={ArticleList}/>
             <Route exact path='/articles/:articleId' component={ArticleEdit}/>
             <Route exact path='/about-us' component={AboutUs}/>
             <Route exact path='/contact-us' component={ContactUs}/>
             <Route exact path='/login-register' component={ComingSoon}/>
           </Switch>
         </Router>
       )
     }
}

export default App;
