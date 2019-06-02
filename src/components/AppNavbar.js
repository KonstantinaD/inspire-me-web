import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class AppNavbar extends Component {
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
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              href="https://pusheen.com/">Log In | Register</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink
                        href="/articles/category/1">Personal Development
                    </NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink
                          href="/articles/category/2" activeClassName="active">Mental Health
                      </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                        href="/articles/category/3">Psychology
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                        href="/articles/category/4">Spirituality
                    </NavLink>
                  </NavItem>
                </Nav>
      </Collapse>
    </Navbar>;
  }
}