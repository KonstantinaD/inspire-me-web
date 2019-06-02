import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

 render() {
   return (
    <div className="footer">
      <Navbar color="dark" dark expand="md">
         <NavbarBrand>
            <span className="navBrand"> © Inspire Me {(new Date().getFullYear())}. All Rights Reserved.</span>
         </NavbarBrand>
         <NavbarToggler onClick={this.toggle}/>
         <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
                <NavItem>
                  <span className="navItem">15 Beach Str, TN17 5RU, Devon, United Kingdom</span>
                </NavItem>
             </Nav>
             <Nav className="ml-auto" navbar>
                 <NavItem>
                    <NavLink
                    href="/about-us">About Us
                    </NavLink>
                 </NavItem>
                 <NavItem>
                    <NavLink
                    href="/contact-us">Contact Us
                    </NavLink>
                 </NavItem>
             </Nav>
         </Collapse>
      </Navbar>
    </div>
    );
  }
}

