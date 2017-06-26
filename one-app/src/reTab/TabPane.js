import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
        classPrefix: PropTypes.string,//从TabContent传过来
        isActive: PropTypes.bool,//从TabContent传过来
    };

    render() {
        const {classPrefix, className, isActive, children} = this.props;
        const classes = classnames({
            [className]: className,
            [`${classPrefix}-panel`]: true,
            [`${classPrefix}-active`]: isActive,
        });

        return (
            <div
                role="tabpanel"
                className={classes}
            >
                {children}
            </div>
        )
    }

}


export default TabPane;
