import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import {Badge, Media} from 'reactstrap';


class ArticleInfo extends Component {
  constructor(props) {
    super(props);
       this.state = {
         articleId: this.props.match.params.articleId,
         isLoading: true,
         article: {}
       };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(`${this.state.articleId}`)
      .then(response => response.json())
      .then(data => this.setState({article: data, isLoading: false}));
  }

  render(){
      const {article, isLoading} = this.state;

      console.log("this.props.match.params.articleId ", this.props.match.params.articleId)

      if (isLoading) {
          return <p>Loading...</p>;
      }

      const imgStyle = {
          maxHeight: 256,
          maxWidth: 256
      };

      return (
        <div>
          <Header/>
            <Media>
                <Media left href="#">
                    <Media object style={imgStyle} src={article.imageUrl} alt="Generic placeholder image"></Media>
                </Media>
                <Media body>
                    <Media heading>{article.articleTitle}</Media>
                    <h6>{article.category.categoryName}</h6>
                    <div>
                        {article.tags.map(tag => <Badge color="success" pill key={tag.tagId}
                        tag={Link} to={"/articles/tags/" + tag.tagId}>{tag.tagName}</Badge>)}
                    </div>
                    <p>{article.articleText}</p>
                </Media>
            </Media>
            <Footer/>
        </div>
      );
  }
}

export default ArticleInfo;