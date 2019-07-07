import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    isOpen: false,
    categories: []
    };
    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
       fetch ('/categories')
         .then(response => response.json())
         .then(data => this.setState({categories: data._embedded.categoryList}));
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
           {this.state.categories.map(category =>
              <NavItem key={category.categoryId}><NavLink key={category.categoryId} href={`/articles/category/${category.categoryId}`}>
                {category.categoryName}
              </NavLink></NavItem>
           )}
        </Nav>
      </Collapse>
    </Navbar>;
  }
}