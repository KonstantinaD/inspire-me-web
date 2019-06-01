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
          <tr>
              <td>{this.state.article.articleId}</td>
              <td>{this.state.article.articleTitle}</td>
              <td>{this.state.article.articleText}</td>
          </tr>
        </div>
      );
  }
}

export default ArticleInfo;