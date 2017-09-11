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
    this.props.loadArticles && this.props.loadArticles();
  }

  render() {
    console.log(this.props);
    const { loading, error, articleList } = this.props;
    if (loading) {
      return <p className="message">Loading...</p>;
    }

    if (error || !articleList) {
      return <p className="message">Oops, something is wrong.</p>;
    }

    return (
      <div>
        {articleList.map(item => (
          <Preview push={this.props.push} {...item} key={item.id}/>
        ))}
      </div>
    );
  }
}

export default PreviewList;