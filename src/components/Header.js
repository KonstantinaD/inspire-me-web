import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink} from 'reactstrap';
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
  const imgStyle = {
      maxHeight: 150,
      maxWidth: 100
  };

    return (
      <Navbar color="dark" dark expand="md">
        <Nav tag={Link} to="/">
           <img  style={imgStyle} src="https://bit.ly/2NFifNk" alt="Inspire Me Home"/>
        </Nav>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                href="/login-register">Log In | Register
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
             {this.state.categories.map(category =>
               <NavItem key={category.categoryId}>
                 <NavLink key={category.categoryId}
                          href={`/articles/category/${category.categoryId}`}>
                          {category.categoryName}
                 </NavLink>
               </NavItem>
             )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}