import React, {Component, cloneElement} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
        //状态初始化
        this.state = {
            active: false,
        };
    }

    onClickButton(e) {
        e.preventDefault();

    }

    //打开窗口
    openPortal(props = this.props) {
        this.setState({active: true}); //active
        this.renderPortal(props);//渲染dom
        // this.props.onOpen(this.node);//打开回调
    }

    //关闭窗口
    closePortal(isUnmounted = false) {
        //复位状态
        const resetPortalState = () => {
            if (this.node) {
                ReactDOM.unmountComponentAtNode(this.node);
                document.body.removeChild(this.node);
            }
            this.portal = null;
            this.node = null;
            if (isUnmounted !== true) {
                this.setState({active: false});
            }
        }

        if (this.state.active) {
            if (this.props.beforeClose) {
                this.props.beforeClose(this.node, resetPortalState);
            } else {
                resetPortalState();
            }
            this.props.onClose();//关闭回调
        }

    }

    //渲染dom
    renderPortal(props) {
        //如果div 不存在,创建div
        if (!this.node) {
            this.node = document.createElement('div');
            // 在节点append 到 DOM 之前，执行 CSS 防止无效的重绘
            //this.applyClassNameAndStyle(props);//div 增加class 和 style
            document.body.appendChild(this.node);
        } else {
            //当新 props 传下来更新 css
            //this.applyClassNameAndStyle(props);
        }
        let children = props.children;

        //cloneElement 传递给children子组件 => closePortal关闭窗口方法
        if (typeof props.children.type === 'function') {
            children = React.cloneElement(props.children, {closePortal: this.closePortal});
        }

        //渲染组件
        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,//自身(父组件)
            children,//子组件
            this.node,//dom , div
            this.props.onUpdate//回调
        );
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
        if (this.props.openByClickOn) {

        }
    }

}
export default Dialog;