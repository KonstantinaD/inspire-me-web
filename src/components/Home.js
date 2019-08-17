import React, {Component} from 'react';
import {Button, Container, Badge, Jumbotron} from 'reactstrap';
import {withCookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state = {
      allTags: [],
      isLoading: true,
      isAuthenticated: false,
      user: undefined
    };
    this.state.csrfToken = cookies.get('XSRF-TOKEN');
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
     const response = await fetch('/users/user', {credentials: 'include'});
     const body = await response.text();
     if (body === '') {
       this.setState(({isAuthenticated: false}))
     } else {
       this.setState({isAuthenticated: true, user: JSON.parse(body)})
     }

     fetch ('/tags')
       .then(response => response.json())
       .then(data => this.setState({allTags: data._embedded.tagList}));
  }

  login() {
      let port = (window.location.port ? ':' + window.location.port : '');
      if (port === ':3000') {
        port = ':8080';
      }
      window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout() {
      fetch('/users/logout', {method: 'POST', credentials: 'include',
        headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
        .then(response => {
          window.location.href = response.logoutUrl + "?id_token_hint=" +
            response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
        });
    }

  render() {
    const {allTags} = this.state;

    const message = this.state.user ?
          <h2>Welcome, {this.state.user.userName}!</h2> :
          <p>Please log in to manage your articles.</p>;

        const button = this.state.isAuthenticated ?
          <div>
            <Button color="link"><Link to="/articles">Manage Articles</Link></Button>
            <br/>
            <Button color="link" onClick={this.logout}>Logout</Button>
          </div> :
          <Button color="primary" onClick={this.login}>Login</Button>;


    return (
      <div>
        <Header/>
        <Container fluid>
          {message}
          {button}
        <br/>
        <br/>
        <Jumbotron>
          <h1 className="display-3">Welcome to Inspire Me!</h1>
          <p className="lead">If you are curious about what the mind can do and how versatile human abilities are,
          this is a great place to read more!</p>
          <hr className="my-2" />
          <p>Discover eye-opening content about psychology, spirituality, personal development and mental health, and
          be inspired to break the routine.</p>
          <div className="float-right">
            <Button color="primary" tag={Link} to="/articles">See All Articles</Button>
          </div>
        </Jumbotron>
        <h5><b>See Articles per Topic</b></h5>
        <br/>
        {allTags.map(tag =>
           <Badge color="success" pill key={tag.tagId} tag={Link} to={`/articles/tags/${tag.tagId}`}>
              {tag.tagName}
           </Badge>
        )}
        </Container>
        <div className="footerPadding"></div>
        <Footer/>
      </div>
    );
  }
}

export default withCookies(Home);