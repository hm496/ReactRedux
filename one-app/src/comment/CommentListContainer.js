import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';


function dissoc(obj, prop) {
    let result = {};
    for (let p in obj) {
        if (p !== prop) {
            result[p] = obj[p];
        }
    }
    return result;//不包含prop
}

const Promised = (promiseProp, Wrapped) => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            value: null,
        };
    }

    componentDidMount() {
        this.props[promiseProp].then(response => response.json())
            .then(value => this.setState({loading: false, value}))
            .catch(error => this.setState({loading: false, error}));
    }

    render() {
        if (this.state.loading) {
            return <span>Loading...</span>;
        } else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        } else {
            //去除promiseProp
            const propsWithoutThePromise = dissoc(this.props, promiseProp);
            return <Wrapped {...propsWithoutThePromise} {...this.state.value} />;
        }
    }

}

class CommentListContainer extends Component {
    render() {
        return (
            <CommentList data={this.props.commentList}/>
        );
    }
}

module.exports = Promised('comments', CommentListContainer)