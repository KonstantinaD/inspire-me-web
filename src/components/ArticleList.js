import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table, Badge} from 'reactstrap';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isLoading: true,
      allTags: []
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch ('/tags')
           .then(response => response.json())
           .then(data => this.setState({allTags: data._embedded.tagList}));

debugger;
    if (this.props.match.params.categoryId) {
        fetch(`${this.props.match.params.categoryId}`)
          .then(response => response.json())
          .then(data => this.setState({articles: data._embedded.articleList, isLoading: false}));
    }
    else if (this.props.match.params.tagId) {
             fetch(`${this.props.match.params.tagId}`)
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
      let updatedArticleList = [...this.state.articles].filter(upd => upd.articleId !== articleId);
      this.setState({articles: updatedArticleList});
    });
  }

  render() {
    const {articles, isLoading, allTags} = this.state;

    console.log("articles: ", articles)
    console.log("allTags.length: ", allTags.length)

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const articleList = articles.map(article => {
     return (
       <tr key={article.articleId}>
        <td><Link to={`/articles/view/${article.articleId}`}>{article.articleTitle}</Link>
        </td>
        <td>{article.category.categoryName}</td>
        <td>{allTags.length > 0 && article.tags.map(tag => <Badge color="success" pill key={"" + article.articleId +
            tag.tagId} href={`/articles/tags/${tag.tagId}`}>{tag.tagName ||
            allTags.find(item => item.tagId === tag).tagName}</Badge>)}
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

export default ArticleList;