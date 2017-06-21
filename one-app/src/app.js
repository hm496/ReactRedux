import React, {Component, cloneElement} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


class Tabs extends Component {
    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
        //状态初始化
        this.state = {
            count: 0,
        };
    }

    onClickButton(e) {
        e.preventDefault();
        this.setState({
            count: this.state.count + 1,
        });
    }

    //由于父组件更新 props 而更新
    //此方法可以作为 React 在 props 传入后，渲染之前 setState 的
    //机会。在此方法中调用 setState 是不会二次渲染的
    componentWillReceiveProps(nextProps) {
        // this.setState({})
        // console.log(arguments);
    }

    //是否 现在更新组件
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(arguments);
        return true;
    }

    //将要 更新组件
    componentWillUpdate(nextProps, nextState) {
        // console.log(arguments);
    }

    //完成 更新组件
    componentDidUpdate(prevProps, prevState) {
        //上一个属性,上一个状态
        // this 为当前组件的实例
    }

    render() {
        const counterStyle = {
            margin: '16px'
        }

        return (
            <div style={counterStyle}>
                <button onClick={this.onClickButton}>Click Me</button>
                <div>
                    Click Count: <span id="clickCount">{this.state.count}</span>
                </div>
            </div>
        );
    }

}
export default Tabs;