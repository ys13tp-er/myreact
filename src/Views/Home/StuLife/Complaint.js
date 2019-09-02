import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';

const { TextArea } = Input;

class complaint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complaintValue: ''
        };
    }

    // 存投诉内容
    complaintV = e => {
        this.setState(
            { complaintValue: e.target.value }
        );
    }
    // 发送投诉
    addComp = () => {
        // console.log(this.state.complaintValue);
        if (this.state.complaintValue) {
            // 发送投诉

            // 提示
            message.info('投诉成功', 2)
        } else {
            message.info('投诉内容不能为空', 2)
        }
    }
    // 返回上一页
    balckComp = () => {
        this.setState(
            { complaintValue: '' }
        );
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="complaint" style={{ with: '100%', padding: '0 12px' }}>
                <div style={{ boxSizing: 'border-box', with: '100%', padding: '16px 12px', border: '1px solid #c5d0dc' }}>
                    <div className="complaintP1">
                        <p>投诉内容:</p>
                        <TextArea
                            className="complaintP1Text"
                            placeholder="本投诉是匿名投诉，不会暴露您的信息"
                            autosize={{ minRows: 13, maxRows: 13 }}
                            onChange={this.complaintV}
                        />
                    </div>
                    <div className="complaintP2">
                        <div className="complaintP2Cont">
                            <Button type="primary" size='large' icon="check" onClick={this.addComp}>添加</Button>
                            <Button size='large' icon="undo" onClick={this.balckComp}>返回</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(complaint);