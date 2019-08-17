import React, {Component} from 'react';
import {Badge, Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import Header from './Header';
import Footer from './Footer';

class ArticleList extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state = {
      articles: [],
      csrfToken: cookies.get('XSRF-TOKEN'),
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});

    if (this.props.match.params.categoryId) {
        fetch(`${this.props.match.params.categoryId}`, {credentials: 'include'})
          .then(response => response.json())
          .then(data => this.setState({articles: data._embedded.articleList, isLoading: false}))
          .catch(() => this.props.history.push('/'));
    }
    else if (this.props.match.params.tagId) {
             fetch(`${this.props.match.params.tagId}`, {credentials: 'include'})
               .then(response => response.json())
               .then(data => this.setState({articles: data._embedded.articleList, isLoading: false}))
               .catch(() => this.props.history.push('/'));
    } else {
        fetch('articles', {credentials: 'include'})
          .then(response => response.json())
          .then(data => this.setState({articles: data._embedded.articleList, isLoading: false}))
          .catch(() => this.props.history.push('/'));
    }
  }

  async remove(articleId) {
    await fetch(`/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': this.state.csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedArticleList = [...this.state.articles].filter(upd => upd.articleId !== articleId);
      this.setState({articles: updatedArticleList});
    });
  }

  render() {
      const {articles, isLoading} = this.state;

      if (isLoading) {
          return <p>Loading...</p>;
      }

      const tagNameByTagId = articles.flatMap(article => article.tags)
          .filter(tag => tag.tagName)
          .reduce((acc, tag) => Object.assign(acc, {[tag.tagId]: tag.tagName}), {});


      const categoryNameByCategoryId = articles.map(article => article.category)
          .filter(category => category.categoryName)
          .reduce((acc, category) => Object.assign(acc, {[category.categoryId]: category.categoryName}), {});

      const articleList = articles.map(article => {
     return (
       <tr key={article.articleId}>
        <td><Link to={`/articles/view/${article.articleId}`}>{article.articleTitle}</Link>
        </td>
           <td>{article.category.categoryName || categoryNameByCategoryId[article.category]}</td>
           <td>{article.tags.map(tag => <Badge color="success" pill key={"" + article.articleId +
           tag.tagId} href={`/articles/tags/${tag.tagId || tag}`}>{tag.tagName || tagNameByTagId[tag]}</Badge>)}
        </td>
        <td>{new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).format(new Date(article.dateArticlePublished))}
        </td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={`/articles/${article.articleId}`}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(article.articleId)}>Delete</Button>
          </ButtonGroup>
        </td>
       </tr>
     );
    });

    return (
      <div className="rootContainer">
        <Header/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/articles/new">Create Article</Button>
          </div>
          <h3>Articles</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tag(s)</th>
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

export default withCookies(withRouter(ArticleList));