import React, { Component } from 'react';
import WrappedNormalLoginForm from './Input/LgInput';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="loginbox">
                    <div className="widget-body">
                        <div className="widget-main">
                            <h4>学员后台系统</h4>
                            <div className="space-6"></div>
                            <WrappedNormalLoginForm></WrappedNormalLoginForm>
                        </div>
                        <div className="toolbar">
                            <a href="http://bbs.mobiletrain.org/forum.php?gid=197">学习总结入口</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;