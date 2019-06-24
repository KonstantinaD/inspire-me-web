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
        categories: [],
        allTags: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleTagChange = this.handleTagChange.bind(this);
  }

  async componentDidMount() {
     fetch ('/categories')
       .then(response => response.json())
       .then(data => this.setState({categories: data._embedded.categoryList}));

     fetch ('/tags')
            .then(response => response.json())
            .then(data => this.setState({allTags: data._embedded.tagList}));

     if (this.props.match.params.articleId !== 'new') {
       const article = await (await fetch(`/articles/${this.props.match.params.articleId}`)).json();
       // convert tags to array of tagIds from array of tag objects

       this.setState({item: article});
     }
  }

  	handleChange(event) {
    const target = event.target
    const name = target.name;
    const value = target.value;
    this.setState({
       item: Object.assign({}, this.state.item, {[name]: value})
    });
  }

  handleTagChange(event) {
  // copy state to get existing tags (ids)
    let existingTags = this.state.item.tags.map(tag => tag.tagId); // [ 1,4,8]
    console.log("existing tags -> ", existingTags)
  // check all available options
    const options = event.target.options;
//[1,2,3,4,5,...]
    // loop available options to see which have been selected
    for (let i = 0; i < options.length; i++){
     if (!existingTags.includes(options[i].value)) {
      if (options[i].selected){
//      var ex1= { tagId: 4, tageNaem: "Anxiety"}
        existingTags.push(Number(options[i].value));
      }
     }
    }

    // update state
     this.setState({
           item: Object.assign({}, this.state.item, { tags: existingTags})
        });
//    let item = {...this.state.item};
//      item.tags = selectedTags;
//      JSON.stringify(item);
//      this.setState({item});

  }


  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch((item.articleId) ? '/articles/' + (item.articleId) : '/articles', {
      method: (item.articleId) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/articles');

    console.log("The tags you selected are: " + this.state.item.tags.map(tag => tag.tagId));
  }

  render() {
    const {item} = this.state;

    const categoryOptions = this.state.categories.map(category =>
        <option key={category.categoryId} name={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
        );

    const tagOptions = this.state.allTags.map(tag =>
        <option key={tag.tagId} name={tag.tagId} value={tag.tagId}>{tag.tagName}</option>
        );

    const title = <h2>{item.articleId ? 'Edit Article' : 'Create Article'}</h2>;

    return (
    <div>
      <Header/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="articleTitle">Title</Label>
            <Input type="text" name="articleTitle" id="articleTitle" value={item.articleTitle || ''}
                   onChange={this.handleChange}/>
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
              <Input type="select" name="category" id="category" value={item.category.categoryId} onChange={this.handleChange}>
                <option value="">Select</option>
                {categoryOptions}
              </Input>
            </FormGroup>
            <FormGroup className="col-md-6 mb-3">
              <Label for="tags">Select Tag(s)</Label>
                <Input type="select" name="tags" id="tags" value={item.tags.map(tag => tag.tagId)} onChange={this.handleTagChange} multiple>
                  {tagOptions}
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

