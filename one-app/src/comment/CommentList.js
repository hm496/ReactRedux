import React, { Component } from 'react';

function CommentList({ data }) {
  return (
    <ul className="comment-box">
      {data.map((entry, i) => (
        <li key={`reponse-${i}`} className="comment-item">
          <p className="comment-item-name">{entry.name}</p>
          <p className="comment-item-content">{entry.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;