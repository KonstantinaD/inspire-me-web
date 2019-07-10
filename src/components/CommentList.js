import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Collapse, Row, Col}
from 'reactstrap';

class CommentList extends Component {
  constructor(props) {
    super(props);
       this.state = {
         articleId: this.props.targetArticleId,
         comments: [],
         collapse: false
       };
       this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    fetch(`/comments/article/${this.props.targetArticleId}`)
      .then(response => response.json())
      .then(data => this.setState({articleId: this.props.targetArticleId, comments: data._embedded.commentList}));
  }

  toggle() {
    this.setState({
       collapse: !this.state.collapse
    });
  }

  render() {
    const {comments, collapse} = this.state;

    const buttonTitle = <span>{collapse ? 'Hide Comments' : 'See Comments'}</span>;

    const commentList = comments.map(comment => {
     return (
        <Container key={comment.commentId} fluid>
        <br/>
        <ListGroup>
           <ListGroupItem>
             <ListGroupItemHeading>
             <Row>
               <Col>
                 <b>{comment.commentPublishedBy.userName}</b>
               </Col>
               <Col>
                 {new Intl.DateTimeFormat('en-GB', {
                         year: 'numeric',
                         month: 'short',
                         day: '2-digit'
                         }).format(new Date(comment.dateCommentPublished))}
               </Col>
             </Row>
             </ListGroupItemHeading>
             <ListGroupItemText>
                {comment.commentText}
             </ListGroupItemText>
           </ListGroupItem>
        </ListGroup>
        </Container>
      );
  });

      return (
       <Container fluid>
         <div className="float-right">
           {commentList.length > 0 && <Button color="info" style={{marginBottom: '1rem'}}
           onClick={this.toggle}>{buttonTitle}</Button>}
           <br/>
         </div>
         <Collapse isOpen={this.state.collapse}>
           <br/>
           {commentList}
         </Collapse>
       </Container>
       );
  }
}

export default CommentList;