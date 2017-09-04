//Store
import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import CommentConstants from "../constants/CommentConstants";

//初始化变量
let comment = [];

const CommentStore = assign({}, EventEmitter.prototype, {
  getComment() {
    return comment;
  },

  emitChange() {
    this.emit("change");
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener(callback);
  }
});

AppDispatcher.register((action) => {
  switch (action.type) {
    //action:修改
    case CommentConstants.LOAD_COMMENT_SUCCESS: {
      comment = action.payload.comment.commentList;
      CommentStore.emitChange();
    }
  }
});

export default CommentStore;