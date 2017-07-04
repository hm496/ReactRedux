import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '../css/style.scss';
import EventEmitter from 'events';
import CSSModules from 'react-css-modules';
import {Seq} from 'immutable';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {Motion, spring} from 'react-motion';


@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class TabContent extends Component {
    static propTypes = {
        panels: PropTypes.node,
        activeIndex: PropTypes.number,
    };

    getTabPanes() {
        const {activeIndex, panels} = this.props;
        return React.Children.map(panels, (child) => {
            if (!child) {
                return;
            }

            const order = parseInt(child.props.order, 10);
            const isActive = activeIndex === order;
            //返回的是TabPane组件
            return React.cloneElement(child, {
                isActive,
                key: `tabpane-${order}`,
            });
        });
    }

    render() {
        const classes = classnames({
            content: true,
        });

        return (
            <div className={classes}>
                {this.getTabPanes()}
            </div>
        );
    }
}

export default TabContent;
