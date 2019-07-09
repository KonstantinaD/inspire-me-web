import React, {Component} from 'react';
import {Badge, Media, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../App.css';
import Header from './Header';
import CommentList from './CommentList';
import RelatedArticles from './RelatedArticles';
import Footer from './Footer';

class ArticleInfo extends Component {
  constructor(props) {
    super(props);
       this.state = {
         articleId: this.props.match.params.articleId,
         article: {},
         isLoading: true
       };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(`${this.state.articleId}`)
      .then(response => response.json())
      .then(data => this.setState({article: data, isLoading: false}));
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
            <RelatedArticles targetArticleId={this.state.articleId}/>
            <div className="footerPadding"></div>
            <Footer/>
        </div>
      );
  }
}

export default ArticleInfo;