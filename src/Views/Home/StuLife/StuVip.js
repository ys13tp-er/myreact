import React, { Component } from 'react';
import { Button, Input, message } from 'antd';
import { withRouter } from 'react-router-dom';

const { TextArea } = Input;

class stuvip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            VIPValue: ''
        };
    }

    // 存申请
    ProblemV = e => {
        this.setState(
            { VIPValue: e.target.value }
        );
    }

    // 发送申请
    addComp = () => {
        if (this.state.VIPValue) {
            // 发送申请

            // 提示
            message.info('申请成功', 2)
        } else {
            message.info('申请内容不能为空', 2)
        }
    }
    // 返回上一页
    balckComp = () => {
        this.setState(
            { complaintValue: '' }
        );
        this.props.history.goBack();
    }

    componentWillMount() {
        // 用户信息获取
        let nawusername = localStorage.getItem('username');
        let newusernumb = localStorage.getItem('usernumb');
        this.setState({
            username: nawusername,
            usernumb: newusernumb
        });
    }

    render() {
        return (
            <div className="StuVip">
                <h3 className="StuVipTitle">您还不是VIP学员，填写下面表单可以申请VIP学员！</h3>
                <div style={{ width: '100%', padding: '0 12px' }}>
                    <div style={{
                        border: '1px solid #c5d0dc',
                        padding: '16px 12px'
                    }}>
                        <div className="StuVipUp">
                            <div className="StuVipUpCont">
                                <p>学员姓名:</p>
                                <Input className="StuVipUpContInput1" disabled placeholder={this.state.username} />
                            </div>
                            <div className="StuVipUpCont">
                                <p>问题内容:</p>
                                <TextArea placeholder="请输入申请理由" className="StuVipUpContInput2" rows={4} onChange={this.ProblemV} />
                            </div>
                            <div className="StuVipUpCont">
                                <div className="StuVipUpContBtn">
                                    <Button type="primary" size='large' icon="check" onClick={this.addComp}>申请</Button>
                                    <Button size='large' icon="undo" onClick={this.balckComp}>返回</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(stuvip);