import CommentStore from "../stores/CommentStore";
import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      comment: CommentStore.getComment(),
    };
  }

  _onChange() {
    this.setState({
      comment: CommentStore.getComment(),
    });
  }

  componentDidMount() {
    CommentStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div>
        <CommentList comment={this.state.comment}></CommentList>
        <CommentForm/>
      </div>
    );
  }

}

export default CommentBox;