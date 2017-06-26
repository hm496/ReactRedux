import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import emitter from '../eventsSingle';

/*
 //ChildContext
 class ListItem extends Component {
 static contextTypes = {
 bgcolor: PropTypes.string,
 };

 render() {
 const {value} = this.props;

 return (
 <li style={{background: this.context.bgcolor}}>
 <span>{value}</span>
 </li>
 );
 }
 }

 class List extends Component {
 static defaultProps = {
 list: [],
 handleItemChange: () => {
 },
 }

 //ChildContext
 static childContextTypes = {
 bgcolor: PropTypes.string,
 };
 //在父组件中定义 ChildContext
 //这样从这一层开始的子组件都可以拿到定义的 context，
 getChildContext() {
 return {
 bgcolor: 'red',
 };
 }

 onItemChange(entry) {
 //每次onChange={this.props.onChange}
 //遍历全部list
 //找到满足prevEntry.text === entry.text的li,取反checked

 const {list} = this.state;
 this.setState({
 list: list.map(prevEntry => ({
 text: prevEntry.text,
 checked: prevEntry.text === entry.text ?
 !prevEntry.checked : prevEntry.checked,
 })),
 });
 this.props.handleItemChange(entry);
 }

 render() {
 const {list} = this.props;
 return (
 <div>
 <ul>
 {list.map((entry, index) => (
 <ListItem key={`list-${index}`} value={entry.text}/>
 ))}
 </ul>
 </div>
 );
 }
 }

 function F2SList() {
 return (
 <List
 list={[{text: 1}, {text: 2}]}
 handleItemChange={(entry) => {
 console.log(entry);
 }}
 />
 );
 }
 export default F2SList;
 */

//没有嵌套关系的组件通信
class ListItem extends Component {
    static defaultProps = {
        checked: false,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <input
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
                <span>{this.props.value}</span>
            </li>
        );
    }
}

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: this.props.list.map(entry => ({
                text: entry.text,
                checked: entry.checked || false,
            })),
        };
    }

    onItemChange(entry) {
        const {list} = this.state;
        this.setState({
            list: list.map(prevEntry => ({
                text: prevEntry.text,
                checked: prevEntry.text === entry.text ?
                    !prevEntry.checked : prevEntry.checked,
            }))
        });
        emitter.emit('ItemChange', entry);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.list.map((entry, index) => (
                        <ListItem
                            key={`list-${index}`}
                            value={entry.text}
                            checked={entry.checked}
                            onChange={this.onItemChange.bind(this, entry)}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

class App extends Component {
    componentDidMount() {
        this.itemChange = emitter.on('ItemChange', (data) => {
            console.log(data);
        });
    }

    componentWillUnmount() {
        emitter.removeListener(this.itemChange);
    }

    render() {
        return (
            <List list={[{text: 1}, {text: 2}]}/>
        );
    }
}

export default App;