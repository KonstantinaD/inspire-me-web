import React, {Component} from 'react';
import '../App.css';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';
import Footer from './Footer';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <Button color="link"><Link to="/articles">See Articles</Link></Button>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default Home;