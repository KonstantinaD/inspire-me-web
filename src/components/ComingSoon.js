import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from './Header';
import Footer from './Footer';

class ComingSoon extends Component {

  render() {

    return (
      <div>
        <Header/>
        <Container fluid>
        <h4><b>Coming Soon</b></h4>
        <br/>
        <h6><b>Watch This Space</b></h6>
        </Container>
        <Footer/>
      </div>
      );
  }
}

export default ComingSoon;