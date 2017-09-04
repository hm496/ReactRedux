import { EventEmitter } from 'events';
import assign from 'object-assign';
import CommentConstants from "../constants/CommentConstants";

//初始化变量
let comment = [];

/*//修改逻辑
//服务器取出最新评论列表,赋值给comment
function loadComment(newComment) {
  comment = newComment;
}*/

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

export default CommentStore;