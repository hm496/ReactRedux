import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

class Counts extends Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.state = {
      count: 0,
    };
  }

  handleTabClick(e) {
    e.preventDefault();
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <a href="#" onClick={this.handleTabClick}>加加更新</a>
      </div>
    );
  }
}
export default Counts;