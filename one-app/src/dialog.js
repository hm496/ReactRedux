import React, {Component, cloneElement} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends Component {
    constructor(props) {
        super(props);
        //状态初始化
        this.state = {
            show: false,
        };
    }

    componentDidMount() {
        console.log(this.props);
    }


    componentWillReceiveProps(nextProps) {

    }

    closePortal() {
        this.props.closePortal();
    }

    render() {
        return (
            <div>
                <input type="button" value="closePortal" onClick={this.closePortal.bind(this)}/>
                <h2>{this.props.title}</h2>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

//Dialog 是一个壳
class Dialog extends Component {
    static defaultProps = {
        onOpen: () => {
        },
        onClose: () => {
        },
        onUpdate: () => {
        },
    };

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
        this.props.onOpen(this.node);//打开时 回调
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
            this.node.className = 'nodeNode';
            document.body.appendChild(this.node);
        } else {
            //当新 props 传下来更新 css
            //this.applyClassNameAndStyle(props);
        }
        let children = props.children;

        //cloneElement 传递给children子组件 => closePortal关闭窗口方法
        if (typeof props.children.type === 'function') {
            children = React.cloneElement(props.children, {closePortal: this.closePortal.bind(this)});
        }

        //渲染组件
        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,//自身(父组件)
            children,//子组件
            this.node,//dom , div
            this.props.onUpdate//回调
        );
    }

    // componentWillReceiveProps(nextProps) {
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true;
    // }


    // componentWillUpdate(nextProps, nextState) {
    // }

    // componentDidUpdate(prevProps, prevState) {
    //
    // }

    // componentDidMount() {
    //     this.openPortal(this.props);
    // }


    render() {
        return null;
    }
}


class Warp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    openShow() {
        let myDialog = this.refs.myDialog;
        myDialog.openPortal(myDialog.props);
    }

    render() {
        return (
            <div>
                <button onClick={this.openShow.bind(this)}>click</button>
                <Dialog ref="myDialog">
                    <Modal ref="myModal" title="My modal">
                        <p>111</p>
                        <p>222</p>
                        <p>333</p>
                    </Modal>
                </Dialog>
            </div>
        );
    }
}

export default Warp;