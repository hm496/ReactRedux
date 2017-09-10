import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PreviewList from '../components/Home/PreviewList';
import { listAction } from './HomeRedux';

class Home extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Home</h1>
        <PreviewList
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);