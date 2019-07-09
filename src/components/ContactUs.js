import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from './Header';
import Footer from './Footer';

class ContactUs extends Component {

  render() {

    return (
     <div>
       <Header/>
       <Container fluid>
       <h4><b>Contact Us</b></h4>
       <br/>
       <h6><b>Email Address</b></h6>
       <p>connect@inspireme.com</p>
       <br/>
       <h6><b>Phone Number</b></h6>
       <p>00 44 7645678906</p>
       <br/>
       <h6><b>Address</b></h6>
       <p>21 Beach Str</p>
       <p>BL17 3UE</p>
       <p>Sunshine</p>
       <p>United Kingdom</p>
       </Container>
       <Footer/>
     </div>
     );
  }
}

export default ContactUs;