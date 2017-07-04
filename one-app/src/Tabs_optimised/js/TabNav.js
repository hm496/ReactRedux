import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import InkBar from './InkBar';
import styles from '../css/style.scss';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import {Seq} from 'immutable';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {Motion, spring} from 'react-motion';

function getOuterWidth(el) {
    return el.offsetWidth;
    //offsetWidth : width + padding + border
    //clientWidth : width + padding
}

function getOffset(el) {
    const html = el.ownerDocument.documentElement;
    const box = el.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset - html.clientTop,
        left: box.left + window.pageXOffset - html.clientLeft,
    };
}

@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class TabNav extends Component {
    static propTypes = {
        panels: PropTypes.node,
        activeIndex: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            inkBarWidth: 0,
            inkBarLeft: 0,
        };
    }

    componentDidMount() {
        //计算 激活 tab 的宽度和相对屏幕的左侧位置
        const {activeIndex} = this.props;
        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[activeIndex];
        this.setState({
            inkBarWidth: getOuterWidth(el),
            inkBarLeft: getOffset(el).left,
        });
    }

    componentDidUpdate(prevProps) {
        // 重新计算 激活 tab 的宽度和相对屏幕的左侧位置
        if (prevProps.activeIndex !== this.props.activeIndex) {
            const {activeIndex} = this.props;
            const node = ReactDOM.findDOMNode(this);
            const el = node.querySelectorAll('li')[activeIndex];

            this.setState({
                inkBarWidth: getOuterWidth(el),
                inkBarLeft: getOffset(el).left,
            });
        }
    }

    getTabs() {
        const {panels, activeIndex} = this.props;

        // children 经过 Immutable 转换后，需要使用 Immutable API 遍历
        return panels.map((child) => {
            if (!child) {
                return;
            }
            const order = parseInt(child.props.order, 10);
            let classes = classnames({
                tab: true,
                tabActive: activeIndex === order,
                disabled: child.props.disabled,
            });
            let events = {};
            if (!child.props.disabled) {
                events = {
                    onClick: this.props.onTabClick.bind(this, order),
                };
            }
            const ref = {};
            if (activeIndex === order) {
                ref.ref = 'activeTab';
            }

            return (
                <li
                    role="tab"
                    {...events}
                    styleName={classes}
                    key={order}
                    {...ref}
                >
                    {child.props.tab}
                </li>
            );
        });
    }

    render() {
        const rootClasses = classnames({
            bar: true,
        });
        const classes = classnames({
            nav: true,
        });

        return (
            <div styleName={rootClasses} role="tablist">
                <Motion style={{left: spring(this.state.inkBarLeft)}}>
                    {({left}) => <InkBar width={this.state.inkBarWidth} left={left}/>}
                </Motion>
                <ul styleName={classes}>
                    {this.getTabs()}
                </ul>
            </div>
        )
    }

}

export default TabNav;
