import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabContent extends Component {
    static propTypes = {
        classPrefix: PropTypes.string,
        panels: PropTypes.node,
        activeIndex: PropTypes.number,
    };

    getTabPanes() {
        const {classPrefix, activeIndex, panels} = this.props;
        return React.Children.map(panels, (child) => {
            if (!child) {
                return;
            }
            const order = parseInt(child.props.order, 10);
            const isActive = activeIndex === order;

            //返回的是TabPane组件
            return React.cloneElement(child, {
                classPrefix,
                isActive,
                key: `tabpane-${order}`,
            });
        });
    }

    render() {
        const {classPrefix} = this.props;
        const classes = classnames({
            [`${classPrefix}-content`]: true,
        });
        return (
            <div className={classes}>
                {this.getTabPanes()}
            </div>
        );
    }
}

export default TabContent;
