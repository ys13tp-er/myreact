import React, { Component } from 'react';
import { Icon, Divider, Button } from 'antd';
import { withRouter } from 'react-router-dom';

class LoginError extends Component {
    constructor(props) {
        super(props);

        // 为了在回调中使用 `this`，这个绑定是必不可少的
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        // console.log(11);
        // 编程式跳转到登录
        this.props.history.push("/login");
    }
    render() {
        return (
            <div className="loginError" style={{ padding: '8px 20px 24px' }}>
                <div className="row">
                    <div className="col" style={{ padding: '0 12px' }}>
                        <div className="error-container" style={{ margin: '20px', background: '#FFF' }}>
                            <div className="error-well">
                                <h1 className="error-grey">
                                    <div className="error-btn">
                                        <Icon className="error-i" type="stop" rotate="90" style={{ fontSize: '36px', lineHeight: '36px' }} />ErrorInfo
                                    </div>
                                </h1>
                                <h1 style={{ fontWeight: 100, color: '#777', fontSize: '31px', lineHeight: '36px', marginBottom: '200px' }}>账号与密码不匹配</h1>
                                We'll deal with it as soon as possible.<Icon type="tool" theme="filled" />
                                <Divider />
                                <Button type="primary" size="large" onClick={this.handleClick}><Icon type="arrow-left" />GO BACK</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withRouter(LoginError);