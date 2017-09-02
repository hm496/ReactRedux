import React, { Component, cloneElement } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Menulist.scss';

class SettingMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul styleName="menu">
        <li styleName="activeitem">个人设置</li>
        <li styleName="item">我的项目</li>
        <li styleName="item">资金管理</li>
        <li styleName="item">系统消息</li>
      </ul>
    );
  }
}

export default CSSModules(SettingMenu, styles);