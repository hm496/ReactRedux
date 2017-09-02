import React, { Component, cloneElement } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.scss';
import Portrait from  './Portrait';
import Menulist from './Menulist';
import UserSettings from './UserSettings';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="box">
        <div styleName="menuside">
          <Portrait/>
          <Menulist/>
        </div>
        <UserSettings/>

      </div>
    );
  }
}

export default CSSModules(App, styles);