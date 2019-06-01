import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleInfo from './components/ArticleInfo';

class App extends Component {
//  state = {
//    isLoading: true,
//    articles: []
//  };
//
//  async componentDidMount() {
//    const response = await fetch('/articles');
//    const body = await response.json();
//    this.setState({ articles: body._embedded.articleList, isLoading: false });
//  }
//
//  render() {
//    const {articles, isLoading} = this.state;
//
//    if (isLoading) {
//      return <p>Loading...</p>;
//    }
//
//    return (
//      <div className="App">
//        <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//          <div className="App-intro">
//            <h2>Article List</h2>
//            {articles.map(article =>
//              <div key={article.articleId}>
//                {article.articleTitle}
//              </div>
//            )}
//          </div>
//        </header>
//      </div>
//    );
//  }
    render() {
       return (
         <Router>
           <Switch>
             <Route path='/' exact={true} component={Home}/>
             <Route path='/articles' exact={true} component={ArticleList}/>
             <Route path='/articles/:articleId' component={ArticleInfo}/>
           </Switch>
         </Router>
       )
     }
}

export default App;
