import React, {Component} from 'react';
import {Badge, Media, Container} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import '../App.css';
import Header from './Header';
import CommentList from './CommentList';
import RelatedArticleList from './RelatedArticleList';
import Footer from './Footer';

class ArticleInfo extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state = {
       articleId: this.props.match.params.articleId,
       article: {},
       csrfToken: cookies.get('XSRF-TOKEN'),
       isLoading: true
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(`${this.state.articleId}`, {credentials: 'include'})
      .then(response => response.json())
      .then(data => this.setState({article: data, isLoading: false}))
      .catch(() => this.props.history.push('/'));
  }

  render() {
      const {article, isLoading} = this.state;

      if (isLoading) {
          return <p>Loading...</p>;
      }

      const imgStyle = {
          maxHeight: 256,
          maxWidth: 256,
          margin: 8
      };

      return (
        <div>
          <Header/>
            <Container fluid>
              <Media>
                <Media>
                  <Media object style={imgStyle} src={article.imageUrl} alt={article.imageUrl ? "Article image" : ""}/>
                </Media>
                <Media body>
                    <Media heading>{article.articleTitle}</Media>
                    <h6>{article.category.categoryName}</h6>
                    <div>
                       {article.tags.map(tag => <Badge color="success" pill key={tag.tagId}
                       tag={Link} to={`/articles/tags/${tag.tagId}`}>{tag.tagName}</Badge>)}
                    </div>
                    <p>{article.articleText}</p>
                </Media>
              </Media>
            </Container>
            <CommentList targetArticleId={this.state.articleId}/>
            <div className="relatedArticlesPadding"></div>
            <RelatedArticleList targetArticleId={this.state.articleId}/>
            <div className="footerPadding"></div>
            <Footer/>
        </div>
      );
  }
}

export default withCookies(withRouter(ArticleInfo));