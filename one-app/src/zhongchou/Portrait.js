import React, { Component, cloneElement } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Portrait.scss';

class Portrait extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="portrait">
        <img styleName="portraitimg" title="portrait"/>
        <div styleName="username">Amy</div>
      </div>
    );
  }
}

export default CSSModules(Portrait, styles);