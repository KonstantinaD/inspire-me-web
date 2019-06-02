import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';
import Footer from './Footer';

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

  render() {
    const {articles, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const articleList = articles.map(article => {
      return <tr key={article.articleId}>
        <td style={{whiteSpace: 'nowrap'}}><Link to={`/articles/${article.articleId}`}>{article.articleTitle}</Link></td>
        <td>{article.articleText.substring(0,200)}</td>
        <td>{new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                      }).format(new Date(article.dateArticlePublished))}</td>
        <td>        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/articles/" + article.articleId}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(article.articleId)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div className="rootContainer">
        <AppNavbar/>
        <Container fluid >
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
        <Footer/>
      </div>
    );
  }
}

export default ArticleList;