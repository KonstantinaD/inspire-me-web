import React, { Component } from 'react';
import AppNavbar from './AppNavbar';

class ArticleInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {articleId: this.props.match.params.articleId, isLoading: true, article: {}};
  }

  componentDidMount() {
    this.setState({isLoading: true});
    console.log("---->", `${this.state.articleId}`)

    fetch(`${this.state.articleId}`)
      .then(response => response.json())
      .then(data => this.setState({article: data, isLoading: false}));
  }

  render(){
      return (
        <div>
          <AppNavbar/>
          <br/>
          <img src={this.state.article.imageUrl} alt="An article's pic" width="1000" height="300"/>
          <h3>{this.state.article.articleTitle}</h3>
          <p>{this.state.article.articleText}</p>
        </div>
      );
  }
}

export default ArticleInfo;