import React, {Component} from 'react';

//属性代理（ props proxy） 。高阶组件通过被包裹的 React 组件来操作 props。
// const MyContainer = (WrappedComponent) =>
//     class extends Component {
//         proc(wrappedComponentInstance) {
//             console.log(wrappedComponentInstance);//<MyComponent/>
//         }
//
//         render() {
//             const props = Object.assign({}, this.props, {
//                 ref: this.proc,//子组件引用回调
//             });
//             return <WrappedComponent {...props} />;
//         }
//     }
//
// @MyContainer
// class MyComponentInp extends Component {
//     static defaultProps = {
//         name: '123123'
//     };
//
//     render() {
//         console.log(this.props);
//         return <input defaultValue={this.props.name}/>;
//     }
// }
//export default MyComponentInp;


//反向继承（ inheritance inversion） 。高阶组件继承于被包裹的 React 组件

//1,条件渲染
const MyContainer1 = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            if (this.props.loggedIn) {
                return super.render();
            } else {
                return null;
            }
        }
    }

//2,对 render 的输出结果进行修改
const MyContainer2 = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            const elementsTree = super.render();
            let newProps = {};
            if (elementsTree && elementsTree.type === 'input') {
                newProps = {value: 'may the force be with you'};
            }
            const props = Object.assign({}, elementsTree.props, newProps);
            const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children);
            return newElementsTree;
        }
    }


export default function () {
    return (
        <input type="text"/>
    );
};

