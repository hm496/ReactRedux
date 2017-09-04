import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentListContainer from './CommentListContainer.js';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: fetch('/api/response.json'),
    };
  }

  onSubmitComment(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <CommentListContainer comments={this.state.comments}></CommentListContainer>
        <CommentForm onSubmitComment={this.onSubmitComment}></CommentForm>
      </div>
    )
  }

}

export default CommentBox;