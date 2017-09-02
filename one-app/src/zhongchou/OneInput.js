import React, { Component, cloneElement } from 'react';
import CSSModules from 'react-css-modules';
import styles from './OneInput.scss';
import PropTypes from 'prop-types';

class SettingMenu extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  };
  static defaultProps = {
    value: "",
    title: "",
    placeholder: "",
    inputType: "text",
  };

  constructor(props) {
    super(props);
    let curProps = this.props;

    this.state = {
      value: curProps.value,
      title: curProps.title,
      placeholder: curProps.placeholder,
      inputType: curProps.inputType,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div styleName="input_warpper">
        <em styleName="input_title">{this.state.title}</em><input
        styleName="input_input" type={this.state.inputType}
        value={this.state.value}
        placeholder={this.state.placeholder}
        onChange={this.handleChange}/>
      </div>
    );
  }
}

export default CSSModules(SettingMenu, styles);