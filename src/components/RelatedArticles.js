import React, {Component} from 'react';
import {Media, Row, Col, Container} from 'reactstrap';

class RelatedArticles extends Component {
  constructor(props) {
    super(props);
       this.state = {
         articleId: this.props.targetArticleId,
         relatedArticles: []
       };
  }

  componentDidMount() {
    fetch(`/articles/relatedArticles/${this.props.targetArticleId}`)
      .then(response => response.json())
      .then(data => this.setState({articleId: this.props.targetArticleId,
      relatedArticles: data._embedded.articleList}));
  }

  render() {
    const {relatedArticles} = this.state;

    const imgStyle = {
              maxHeight: 256,
              maxWidth: 256
          };

    const title = <h5><b>{relatedArticles.length > 0 ? 'Check These Articles Out' : ''}</b></h5>;

    const articleList = relatedArticles.map(article => {
      return (
         <Container fluid key={article.articleId}>
         <Row>
          <Col>
            <Media href={`/articles/view/${article.articleId}`}>
                <Media object style={imgStyle} src={article.imageUrl} alt={article.imageUrl ? "Article image" : ""}/>
            </Media>
          </Col>
          <Col>
            <a href={`/articles/view/${article.articleId}`}>
              <b>{article.articleTitle}</b>
            </a>
          </Col>
         </Row>
         </Container>
      );
    });

    return (
      <Container fluid>
        {title}
        {articleList}
      </Container>
    );
  }
}

export default RelatedArticles;