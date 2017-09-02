import React, { Component, cloneElement } from 'react';
import CSSModules from 'react-css-modules';
import styles from './OneButton.scss';
import PropTypes from 'prop-types';

class SettingMenu extends Component {
  static defaultProps = {
    value: "按钮",
    type: "1",
    style: {}
  };

  constructor(props) {
    super(props);
    let curProps = this.props;

    this.state = {
      value: curProps.value,
      type: curProps.type,
      style: curProps.style,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  handleClick(event) {
  }

  render() {
    let btnClass = '';
    switch (this.state.type) {
      case 1:
        btnClass = "input_button1";
        break;
      case 2:
        btnClass = "input_button2";
        break;
      case 3:
        btnClass = "input_button3";
        break;
      default:
        btnClass = "input_button1";
    }

    return (
      <input
        styleName={btnClass} type="button"
        style={this.state.style}
        value={this.state.value}
        onClick={this.handleClick}/>
    );
  }
}

export default CSSModules(SettingMenu, styles);