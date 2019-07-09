import React, {Component} from 'react';
import {Button, Container, Badge, Jumbotron} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

class Home extends Component {
  constructor(props) {
     super(props);
       this.state = {
          allTags: []
       };
  }

  async componentDidMount() {
     fetch ('/tags')
       .then(response => response.json())
       .then(data => this.setState({allTags: data._embedded.tagList}));
  }

  render() {
    const {allTags} = this.state;

    return (
      <div>
        <Header/>
        <Container fluid>
        <Jumbotron>
          <h1 className="display-3">Welcome to Inspire Me!</h1>
          <p className="lead">If you would like to learn what the mind can do and how limitless human abilities are, this is a great place to read more!</p>
          <hr className="my-2" />
          <p>Discover eye-opening content about psychology, spirituality, personal development and mental health, and be inspired to break the routine.</p>
          <div className="float-right">
            <Button color="primary" tag={Link} to="/articles">See All Articles</Button>
          </div>
        </Jumbotron>
        <h5><b>See Articles per Topic</b></h5>
        <br/>
        {allTags.map(tag =>
           <Badge color="success" pill key={tag.tagId} tag={Link} to={`/articles/tags/${tag.tagId}`}>
              {tag.tagName}
           </Badge>
        )}
        </Container>
        <div className="footerPadding"></div>
        <Footer/>
      </div>
    );
  }
}

export default Home;