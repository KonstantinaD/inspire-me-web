import React, {Component} from 'react';
import '../App.css';
import Header from './Header';
import {Link} from 'react-router-dom';
import {Button, Container, Badge} from 'reactstrap';
import Footer from './Footer';

class Home extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Container fluid>
          <Button color="link"><Link to="/articles">See All Articles</Link></Button>
          <div>
              <Badge href="/articles/tags/1" color="success" pill>Depression</Badge>
              <Badge href="/articles/tags/2" color="success" pill>Anxiety</Badge>
              <Badge href="/articles/tags/3" color="success" pill>Phobias</Badge>
              <Badge href="/articles/tags/4" color="success" pill>Psychotherapy</Badge>
              <Badge href="/articles/tags/5" color="success" pill>Mindfulness</Badge>
              <Badge href="/articles/tags/6" color="success" pill>Religion</Badge>
              <Badge href="/articles/tags/7" color="success" pill>Supernatural</Badge>
              <Badge href="/articles/tags/8" color="success" pill>Healing</Badge>
              <Badge href="/articles/tags/9" color="success" pill>Eastern Practices</Badge>
              <Badge href="/articles/tags/10" color="success" pill>Motivation</Badge>
              <Badge href="/articles/tags/11" color="success" pill>Relationships</Badge>
              <Badge href="/articles/tags/12" color="success" pill>Positive Thinking</Badge>
              <Badge href="/articles/tags/13" color="success" pill>Emotions</Badge>
              <Badge href="/articles/tags/14" color="success" pill>Self-Help</Badge>
              <Badge href="/articles/tags/15" color="success" pill>Time Management</Badge>
              <Badge href="/articles/tags/16" color="success" pill>Learning From Experience</Badge>
              <Badge href="/articles/tags/17" color="success" pill>Personal Development Methods</Badge>
          </div>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default Home;