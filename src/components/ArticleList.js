import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {articles: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    if(this.props.match.params.categoryId){
        fetch(`${this.props.match.params.categoryId}`)
          .then(response => response.json())
          .then(data => this.setState({articles: data._embedded.articleList, isLoading: false}));

    } else {
        fetch('articles')
          .then(response => response.json())
          .then(data => this.setState({articles: data._embedded.articleList, isLoading: false}));
    }
  }

  async remove(articleId) {
    await fetch(`/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedArticles = [...this.state.articles].filter(i => i.articleId !== articleId);
      this.setState({articles: updatedArticles});
    });
  }

  handleClick = (articleId, event) => {
    this.props.history.push(`/articles/${articleId}`)
  };

  render() {
    const {articles, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const articleList = articles.map(article => {
      return <tr key={article.articleId} onClick={this.handleClick.bind(this, article.articleId)}>
        <td style={{whiteSpace: 'nowrap'}}>{article.articleTitle}</td>
        <td>{article.articleText}</td>
        <td>{article.dateArticlePublished}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/articles/" + article.articleId}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(article.articleId)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/articles/new">Create Article</Button>
          </div>
          <h3>Articles</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>Title</th>
              <th>Text</th>
              <th>Date Published</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {articleList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ArticleList;