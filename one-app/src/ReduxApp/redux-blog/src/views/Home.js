import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PreviewList from '../components/Home/PreviewList';
import { listAction } from './HomeRedux';
import { push } from 'react-router-redux';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <PreviewList
          push={this.props.push}
          {...this.props.list}
          {...this.props.listActions}
        />
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    list: state.home.list,
  };
}

//bindActionCreators的作用是将一个或多个action和dispatch组合起来生成mapDispatchToProps需要生成的内容
function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(listAction, dispatch),
    push: bindActionCreators(push, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);