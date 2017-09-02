/**
 * Created by Administrator on 2017/6/26.
 */
/* components/Button.js */
import React, { Component } from 'react';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './Button.scss';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
  }

  render() {
    const cx = classNames({
      confirm: !this.state.disabled,
      disabledConfirm: this.state.disabled,
    });
    return (
      <div styleName="root" style={{ backgroundColor: '#000' }}>
        <a className="btn" styleName={cx}>Confirm</a>
      </div>
    );
  }
}

export default CSSModules(Dialog, styles);
// =>
// Object {
// normal: 'button--normal-abc5436',
// disabled: 'button--disabled-def884',
// }