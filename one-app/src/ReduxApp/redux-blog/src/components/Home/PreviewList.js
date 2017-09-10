import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Preview from './Preview';

class PreviewList extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    articleList: PropTypes.arrayOf(PropTypes.object),
    loadArticles: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadArticles();
  }

  render() {
    const { loading, error, articleList } = this.props;
    if (error) {
      return <p className="message">Oops, something is wrong.</p>;
    }
    if (loading) {
      return <p className="message">Loading...</p>;
    }
    return (
      <div>
        {articleList.map(item => (
          <Preview {...item} key={item.id}/>
        ))}
      </div>
    );
  }
}

export default PreviewList;