import React, {Component} from 'react';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import '../App.css';
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
       const article = await (await fetch(`/articles/view/${this.props.match.params.articleId}`)).json();
       this.setState({
         item: article
       });
     }
  }

  handleChange(event) {
     const target = event.target
     const name = target.name;
     const value = target.value;

   	 if (name === "category") {
    	const categoryObject = this.state.categories.find(category => category.categoryId === Number(value));
        this.setState({
			item: Object.assign({}, this.state.item, {category: categoryObject})
    	});
	 } else {
		this.setState({
			item: Object.assign({}, this.state.item, {[name]: value})
    	});
	  }
  }

  handleTagChange(event) {
     let selectedTags = this.state.item.tags;
     const allTags = this.state.allTags;
     const value = event.target.value;
     let selectedTagIds = selectedTags.map(tag => tag.tagId);
        if (selectedTagIds.includes(Number(value))) {
            selectedTags = selectedTags.filter(t => t.tagId !== Number(value))
        } else {
            var newTagObject = allTags.find(tag => tag.tagId === Number(value))
            selectedTags.push(newTagObject)
        }
     this.setState({
            item: Object.assign({}, this.state.item, {tags: selectedTags})
     });
  }

  async handleSubmit(event) {
      if (this.validateFields()) {
      event.preventDefault();
      const {item} = this.state;
      await fetch((item.articleId) ? `/articles/${item.articleId}` : '/articles', {
          method: (item.articleId) ? 'PUT' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });
      this.props.history.push('/articles');
      }
  }

  validateFields() {
     const {item} = this.state;

     if (!(item.category && Object.keys(item.category).length > 0)) {
        alert('Please select a category');
        return false;
     }
     return true;
  }

  render() {
    const {item} = this.state;

    const categoryOptions = this.state.categories.map(category =>
        <option key={category.categoryId} name={category.categoryName} value={category.categoryId}>
        {category.categoryName}</option>
        );

    const tagOptions = this.state.allTags.map(tag =>
        <option key={tag.tagId} name={tag.tagName} value={tag.tagId}>{tag.tagName}</option>
        );

    const title = <h2>{item.articleId ? 'Edit Article' : 'Create Article'}</h2>;

    return (
     <div>
       <Header/>
       <Container fluid>
          {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="articleTitle">Title<span style={{color: 'red'}}> *</span></Label>
            <Input type="text" name="articleTitle" id="articleTitle" value={item.articleTitle || ''}
                   onChange={this.handleChange} required/>
          </FormGroup>
          <FormGroup>
            <Label for="articleText">Text<span style={{color: 'red'}}> *</span></Label>
            <Input type="textarea" name="articleText" id="articleText" value={item.articleText || ''}
                   onChange={this.handleChange} required/>
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">Image URL<span style={{color: 'red'}}> *</span></Label>
            <Input type="text" name="imageUrl" id="imageUrl" value={item.imageUrl || ''}
                   onChange={this.handleChange} required/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-6 mb-3">
              <Label for="category">Select Category<span style={{color: 'red'}}> *</span></Label>
              <Input type="select" name="category" id="category"
                     value={(item.category && Object.keys(item.category).length > 0) ? item.category.categoryId : 0}
                     onChange={this.handleChange}>
                   <option>Select</option>
                   {categoryOptions}
              </Input>
            </FormGroup>
            <FormGroup className="col-md-6 mb-3">
              <Label for="tags">Select Tag(s)</Label>
               <Input type="select" name="tags" id="tags" value={item.tags.map(tag => tag.tagId)}
                      onClick={this.handleTagChange} multiple>
                    {tagOptions}
               </Input>
            </FormGroup>
          </div>
          <FormGroup className={"float-right bottomPadding"}>
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

