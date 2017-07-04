import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import styles from '../css/style.scss';
import classnames from 'classnames';
import TabNav from './TabNav';
import TabContent from './TabContent';

import EventEmitter from 'events';
import CSSModules from 'react-css-modules';
import {Seq} from 'immutable';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {Motion, spring} from 'react-motion';

@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class Tabs extends Component {
    //类型检查
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
        //组件内更新
        defaultActiveIndex: PropTypes.number,
        //组件外更新
        activeIndex: PropTypes.number,
        // 切换时回调函数
        onChange: PropTypes.func,
    };
    //属性默认值
    static defaultProps = {
        onChange: a => a,
    };

    constructor(props) {
        super(props);
        const currProps = this.props;

        this.handleTabClick = this.handleTabClick.bind(this);
        this.immChildren = Seq(currProps.children);

        let activeIndex;
        if ('activeIndex' in currProps) {
            activeIndex = currProps.activeIndex;
        } else if ('defaultActiveIndex' in currProps) {
            activeIndex = currProps.defaultActiveIndex;
        }

        //状态初始化
        this.state = {
            activeIndex,//当前索引
            prevIndex: activeIndex,//上一个索引
        };
    }

    componentWillReceiveProps(nextProps) {
        // 外部更新
        // 如果 props 传入 activeIndex，则直接更新
        if ('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex,
            });
        }
    }

    handleTabClick(activeIndex) {
        // 内部更新
        const prevIndex = this.state.activeIndex;

        if (this.state.activeIndex !== activeIndex &&
            'defaultActiveIndex' in this.props) {
            this.setState({
                activeIndex,
                prevIndex,
            });

            this.props.onChange({activeIndex, prevIndex});
        }
    }

    renderTabNav() {
        return (
            <TabNav
                key="tabBar"
                onTabClick={this.handleTabClick}
                panels={this.immChildren}
                activeIndex={this.state.activeIndex}
            />
        );
    }

    renderTabContent() {
        return (
            <TabContent
                key="tabcontent"
                panels={this.immChildren}
                activeIndex={this.state.activeIndex}
            />
        );
    }

    render() {
        const {className} = this.props;
        const classes = classnames(className, 'ui-tabs');

        return (
            <div className={classes}>
                {this.renderTabNav()}
                {this.renderTabContent()}

                {/*<div id="tab-demo">*/}

                {/*<div className="tabs-bar" role="tablist">*/}
                {/*<ul className="tabs-nav">*/}
                {/*<li role="tab" className="tabs-tab">Tab 1</li>*/}
                {/*<li role="tab" className="tabs-tab">Tab 2</li>*/}
                {/*<li role="tab" className="tabs-tab">Tab 3</li>*/}
                {/*</ul>*/}
                {/*</div>*/}

                {/*<div className="tabs-content">*/}
                {/*<div role="tabpanel" className="tabs-panel">*/}
                {/*第一个 Tab 里的内容*/}
                {/*</div>*/}
                {/*<div role="tabpanel" className="tabs-panel">*/}
                {/*第二个 Tab 里的内容*/}
                {/*</div>*/}
                {/*<div role="tabpanel" className="tabs-panel">*/}
                {/*第三个 Tab 里的内容*/}
                {/*</div>*/}
                {/*</div>*/}

                {/*</div>*/}
            </div>
        );
    }
}
export default Tabs;