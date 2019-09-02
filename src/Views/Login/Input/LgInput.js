import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter, HashRouter } from 'react-router-dom';

const router = new HashRouter();

class LgInput extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                // 获取用户数据
                React.$axios.get(
                    "http://localhost:3000/qfmdb/gituser",
                    {
                        params: {
                            usernumb: values.usernumb
                        }
                    }
                )
                    // 请求成功
                    .then(function (response) {
                        // console.log(response);
                        let userInf = response.data[0];
                        // console.log(userInf);
                        if (values.usernumb === userInf.usernumb && values.password === userInf.password) {
                            console.log('登录成功');
                            // 存储用户名和账号
                            localStorage.setItem("username", userInf.username);
                            localStorage.setItem("usernumb", userInf.usernumb);
                            // 存储返回的token
                            localStorage.setItem("token", userInf.token);
                            // 跳转到首页
                            router.history.push('/home');
                        } else {
                            console.log('登录失败');
                            // console.log(this);
                            router.history.push('/loginError');
                        }
                    })
                    // 请求失败
                    .catch(function (error) {
                        console.log(error);
                        // console.log('登录请求错误');
                        // 此时是请求结果抛出的错误为undefind，this指向它，所以不能直接调用withRouter
                        router.history.push('/loginError');
                    });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('usernumb', {
                        rules: [{ required: true, message: '请输入你的账号!' }],
                    })(
                        <Input
                            suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="身份证号码/学号"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入你的密码!' }],
                    })(
                        <Input
                            suffix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"><Icon rotate={270} type="key" />登录</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LgInput);

export default withRouter(WrappedNormalLoginForm);