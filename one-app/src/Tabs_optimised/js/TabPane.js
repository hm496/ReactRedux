import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '../css/style.scss';
import CSSModules from 'react-css-modules';
import {Seq} from 'immutable';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class TabPane extends Component {
    //TabNav组件 渲染props.tab
    //TabContent组件 渲染TabPane整体
    static propTypes = {
        tab: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]).isRequired,
        order: PropTypes.string.isRequired,
        disable: PropTypes.bool,
        isActive: PropTypes.bool,//从TabContent传过来
    };

    render() {
        const {className, isActive, children} = this.props;

        const classes = classnames({
            panel: true,
            contentActive: isActive,
        });

        return (
            <div
                role="tabpanel"
                styleName={classes}
                aria-hidden={!isActive}>
                {children}
            </div>
        )
    }
}

export default TabPane;