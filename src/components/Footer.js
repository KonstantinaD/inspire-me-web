import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
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
            <span className="navBrand"> © Inspire Me {(new Date().getFullYear())}</span>
         </NavbarBrand>
         <NavbarToggler onClick={this.toggle}/>
         <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
                <NavItem>
                  <span className="navItem">21 Beach Str, BL17 3UE, Sunshine, United Kingdom</span>
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

