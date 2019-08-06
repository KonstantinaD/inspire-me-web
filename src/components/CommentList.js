import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Collapse, Row, Col} from 'reactstrap';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.targetArticleId,
      comments: [],
      collapse: false,
      numComments: 0
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    fetch(`/comments/article/${this.state.articleId}`)
      .then(response => response.json())
      .then(data => this.setState({articleId: this.state.articleId, comments: data._embedded.commentList,
      numComments: (data._embedded.commentList).length}));
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  async remove(commentId) {
    await fetch(`/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedCommentList = [...this.state.comments].filter(upd => upd.commentId !== commentId);
      let numberComments = this.state.numComments - 1;
      this.setState({comments: updatedCommentList, numComments: numberComments});
    });
  }

  render() {
    const {comments, collapse, numComments} = this.state;

    const buttonTitle = <span>{collapse ? `Hide Comments (${numComments})` : `See Comments (${numComments})`}</span>;

    const commentList = comments.map(comment => {
     return (
        <Container key={comment.commentId} fluid>
        <br/>
        <ListGroup>
           <ListGroupItem>
             <ListGroupItemHeading>
             <Row>
               <Col xs="4">
                 <b>{comment.commentPublishedBy.userName}</b>
               </Col>
               <Col xs="4">{new Intl.DateTimeFormat('en-GB', {
                             year: 'numeric',
                             month: '2-digit',
                             day: '2-digit',
                             hour: '2-digit',
                             minute: '2-digit'
                           }).format(new Date(comment.dateCommentPublished))}
               </Col>
               <Col xs="4">
                 <Button size="sm" color="danger" className="float-right" onClick={() =>
                 this.remove(comment.commentId)}>Delete</Button>
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