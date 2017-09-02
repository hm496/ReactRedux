import React, { Component, cloneElement } from 'react';
import CSSModules from 'react-css-modules';
import styles from './UserSettings.scss';
import OneInput from './OneInput';
import OneButton from './OneButton';

class SettingMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="UserSettings">
        <div>
          <div styleName="part_title">个人资料</div>
          <form>
            <ul styleName="part_ul">
              <li styleName=""><OneInput title="真实姓名" placeholder="请输入真实姓名" value="Amy"/></li>
              <li styleName="part_li"><OneInput title="手机号" placeholder="请输入真实姓名" value="139012345678"/></li>
              <li styleName="part_li"><OneInput title="邮箱" placeholder="请输入真实姓名" value="amy@126.com"/></li>
            </ul>
            <div styleName="btnRs">
              <OneButton type={1} value="修改"/>
            </div>
          </form>

          <form>
            <ul styleName="part_ul">
              <li styleName="part_li"><span>当前手机号</span><span styleName="phonenum">139012345678</span><OneButton
                type={3}
                value="发送验证码"/></li>
              <li styleName="part_li"><OneInput title="验证码" placeholder="请输入真实姓名" value="139012"/></li>
              <li styleName="part_li"><OneInput inputType="password" title="输入新密码" placeholder="请输入新密码"
                value="139012345678"/></li>
              <li styleName="part_li"><OneInput inputType="password" title="再次输入新密码" placeholder="请输入新密码"
                value="amy@126.com"/></li>
            </ul>
            <div styleName="btnRs">
              <OneButton type={2} value="取消"/><OneButton type={1} style={{ "marginLeft": "20px" }} value="保存"/>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

export default CSSModules(SettingMenu, styles);