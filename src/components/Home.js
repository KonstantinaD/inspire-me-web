import React, {Component} from 'react';
import '../App.css';
import Header from './Header';
import {Link} from 'react-router-dom';
import {Button, Container, Badge} from 'reactstrap';
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
          <Button color="link"><Link to="/articles"><b>See All Articles</b></Link></Button>
          <div>
             <b>See Articles per Tag:</b>
          </div>
          <div>
             {allTags.map(tag =>
                <Badge color="success" pill key={tag.tagId} tag={Link} to={`/articles/tags/${tag.tagId}`}>{tag.tagName}
                </Badge>
             )}
          </div>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default Home;