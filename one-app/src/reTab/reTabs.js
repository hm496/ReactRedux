import React, {Component, cloneElement} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from '../css/style.scss';

class Tabs extends Component {
    static propTypes = {}

    constructor(props) {
        super(props);
        //状态初始化
        this.state = {
            active: false,
        };
    }

    render() {
        return (
            <div id="tab-demo">
                <div className="tabs-bar" role="tablist">
                    <ul className="tabs-nav">
                        <li role="tab" className="tabs-tab">Tab 1</li>
                        <li role="tab" className="tabs-tab">Tab 2</li>
                        <li role="tab" className="tabs-tab">Tab 3</li>
                    </ul>
                </div>
                <div className="tabs-content">
                    <div role="tabpanel" className="tabs-panel">
                        第一个 Tab 里的内容
                    </div>
                    <div role="tabpanel" className="tabs-panel">
                        第二个 Tab 里的内容
                    </div>
                    <div role="tabpanel" className="tabs-panel">
                        第三个 Tab 里的内容
                    </div>
                </div>
            </div>
        );
    }
}
export default Tabs;