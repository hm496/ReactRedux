import React, {Component, cloneElement} from 'react';
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