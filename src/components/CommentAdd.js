import React, {Component} from 'react';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';

class CommentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      commentText: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.validateFields()) {
      await fetch('/comments', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(this.state.commentText),
      });
    }
  }

  validateFields() {
    if (this.state.commentText === "") {
        alert('Please provide text for the comment');
        return false;
    }
    return true;
    }

  cancel(event) {
    event.preventDefault();
  }

  render() {
    const title = <h2>Create Comment</h2>;

    return (
     <div>
       <Container fluid>
          {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="commentText">Text<span style={{color: 'red'}}> *</span></Label>
            <Input type="text" name="commentText" id="commentText" value={this.state.commentText || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup className={"float-right bottomPadding"}>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" onClick={this.cancel}>Cancel</Button>
          </FormGroup>
        </Form>
       </Container>
     </div>
    );
  }
}

export default CommentAdd;