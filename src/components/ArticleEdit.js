import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';

class ArticleEdit extends Component {

  emptyItem = {
    articleTitle: '',
    articleText: '',
    imageUrl: '',
    category: {},
    tags: []
  };

  constructor(props) {
    super(props);
      this.state = {
        item: this.emptyItem,
        categories: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
     let allCategories = [];

     fetch ('/categories')
                .then(response => {
                    return response.json();
                }).then(data => {
                allCategories = data._embedded.categoryList.map(category => {
                    return category
                });
     this.setState({categories: allCategories});
                });

      if (this.props.match.params.articleId !== 'new') {
        const article = await (await fetch(`/articles/${this.props.match.params.articleId}`)).json();

        this.setState({item: article});
        }

  }

  handleChange(event) {
    const target = event.target
    const name = target.name;
    const value = target.value;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});

    console.log("The category you selected is: " + item.category.categoryName);
    alert("The category you selected is: " + event.target.value);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    console.log("Event.target: " + event.target);
    console.log("Event.value: " + event.value);

    await fetch((item.articleId) ? '/articles/' + (item.articleId) : '/articles', {
      method: (item.articleId) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/articles');

    console.log("Event.target: " + event.target);
    console.log("Event.value: " + event.value);
  }

  render() {
    const {item} = this.state;

    const categoryOptions = this.state.categories.map(category =>
    <option key={category.categoryId} value={category.categoryName}>{category.categoryName}</option>
    );

    const title = <h2>{item.articleId ? 'Edit Article' : 'Create Article'}</h2>;

    console.log("The category you selected is: " + item.categoryName);

    return (
    <div>
      <Header/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="articleTitle">Title</Label>
            <Input type="text" name="articleTitle" id="articleTitle" value={item.articleTitle || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="articleText">Text</Label>
            <Input type="textarea" name="articleText" id="articleText" value={item.articleText || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">Image URL</Label>
            <Input type="text" name="imageUrl" id="imageUrl" value={item.imageUrl || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-6 mb-3">
              <Label for="category">Select Category</Label>
                <Input type="select" name="categoryName" id="category"
                    onChange={this.handleChange}>
                  <option value="">Select</option>
                  {categoryOptions}
                </Input>
            </FormGroup>
            <FormGroup className="col-md-6 mb-3">
              <Label for="taqs">Select Tag(s)</Label>
                <Input type="select" name="taqs" id="taqs" value={item.tags.map(tag => tag.tagName) || ''} onChange={this.handleChange} multiple>
                  <option>Depression</option>
                  <option>Anxiety</option>
                  <option>Phobias</option>
                  <option>Psychotherapy</option>
                  <option>Mindfulness</option>
                  <option>Religion</option>
                  <option>Supernatural</option>
                  <option>Healing</option>
                  <option>Eastern Practices</option>
                  <option>Motivation</option>
                  <option>Relationships</option>
                  <option>Positive Thinking</option>
                  <option>Emotions</option>
                  <option>Self-Help</option>
                  <option>Time Management</option>
                  <option>Learning From Experience</option>
                  <option>Personal Development Methods</option>
                </Input>
            </FormGroup>
          </div>
          <FormGroup className="float-right">
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/articles">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
      <Footer/>
    </div>
    );
  }
}

export default withRouter(ArticleEdit);

