import React, {Component, cloneElement} from 'react';
import ReactDOM from 'react-dom';


const MyContainer = (WrappedComponent) =>
    class extends Component {
        render() {
            return <WrappedComponent name={8989}/>;
        }
    }

// @MyContainer
class MyComponentInp extends Component {
    static defaultProps = {
        name: 123456
    }

    render() {
        console.log(this.props);
        return <div>{this.props.name}</div>;
    }
}

console.log(MyComponentInp.toString());

export default MyComponentInp;

