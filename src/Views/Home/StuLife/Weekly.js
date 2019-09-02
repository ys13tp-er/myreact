import React, { Component } from 'react';
import { Input, Button, Modal, message, Table } from 'antd';
import { withRouter } from 'react-router-dom';
import qs from 'qs'

const { TextArea } = Input;

// 时间转换：毫秒数或中国标准时间转日期
function msToDate(msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let result1 = year +
        '-' +
        ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
        '-' +
        ((date + 1) < 10 ? '0' + date : date) +
        ' ' +
        ((hour + 1) < 10 ? '0' + hour : hour) +
        ':' +
        ((minute + 1) < 10 ? '0' + minute : minute) +
        ':' +
        ((second + 1) < 10 ? '0' + second : second);

    let result2 = year +
        '-' +
        ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
        '-' +
        ((date + 1) < 10 ? '0' + date : date);

    let result = {
        hasTime: result1,
        withoutTime: result2
    };

    return result;
}


// 表格表头
const columns = [
    {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '周报标题',
        dataIndex: 'weekT',
        key: 'weekT',
    },
    {
        title: '周报内容',
        key: 'weekC',
        dataIndex: 'weekC',
        width: '40%'
    },
    {
        title: '周报状态',
        key: 'resss',
        dataIndex: 'resss'
    },
    {
        title: '创建时间',
        key: 'times',
        dataIndex: 'times'
    }
];

class problem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            ProblemValue: '',
            WeeklyValue: '',
            proTable: []
        };
    }

    // 获取表格数据
    getProData = () => {
        let newusernumb = localStorage.getItem('usernumb');
        // 获取用户问题数据
        const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        React.$axios.get(
            "http://localhost:3000/qfmdb/gitWeekly",
            {
                params: {
                    usernumb: newusernumb
                }
            }
        )
            // 请求成功
            .then(function (response) {
                // console.log(response);
                let userInf = response.data;
                // console.log(userInf);
                // 设置nowdata存储数据
                let nowdata = [];
                for (var i = 0; i < userInf.length; i++) {
                    let timesV = msToDate(userInf[i].times - 0).hasTime;
                    nowdata.push({
                        usernumb: userInf[i].usernumb,
                        username: userInf[i].username,
                        weekT: userInf[i].weekT,
                        weekC: userInf[i].weekC,
                        times: timesV,
                        resss: userInf[i].resss
                    })
                }
                // console.log(nowdata);
                _this.setState(
                    { proTable: nowdata }
                );
            })
    }

    // 存标题
    WeeklyV = e => {
        this.setState(
            { WeeklyValue: e.target.value }
        );
    }

    // 存内容
    ProblemV = e => {
        this.setState(
            { ProblemValue: e.target.value }
        );
    }

    // 发送问题
    addComp = () => {
        // console.log(this.state.complaintValue);
        if (this.state.ProblemValue && this.state.WeeklyValue) {
            Modal.confirm({
                content: '确定提交？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    console.log('确定');
                    // 获取的时间戳是把毫秒改成000显示，
                    let times = Date.parse(new Date());
                    // console.log(times);
                    // 发送请求提交
                    React.$axios.post('http://localhost:3000/qfmdb/insertWeekly', qs.stringify({
                        username: this.state.username,
                        usernumb: this.state.usernumb,
                        weekT: this.state.WeeklyValue,
                        weekC: this.state.ProblemValue,
                        times: times,
                        resss: '待审核'
                    }))
                        .then(res => {
                            // console.log('res=>', res);
                            if (res.data.result.n) {
                                console.log('插入成功');
                                // 提示
                                message.info('提交成功', 2);
                                // 更新表格
                                this.getProData();
                                // 销毁
                                // modal.destroy();
                            } else {
                                console.log('插入失败');
                                // 提示
                                message.info('提交失败', 2);
                            }
                        })
                },
                onCancel: () => {
                    console.log('取消');
                    // 提示
                    message.info('取消成功', 2);
                    // 销毁
                    // modal.destroy();
                }
            });
        } else {
            message.info('提交内容不能为空', 2);
        }
    }

    // 返回上一页
    balckComp = () => {
        this.setState(
            { ProblemValue: '' }
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
        this.getProData();
    }

    componentWillUnmount() {
        //销毁对话框，避免内存泄漏
        Modal.destroyAll();
    }


    render() {
        // 问题列表数据
        const data = this.state.proTable;
        return (
            <div className="Problem">
                <div className="ProblemUp">
                    <div className="ProblemUpCont">
                        <p>学员姓名:</p>
                        <Input className="ProblemUpContInput1" disabled placeholder={this.state.username} />
                    </div>
                    <div className="ProblemUpCont">
                        <p>周报标题:</p>
                        <Input className="ProblemUpContInput1" placeholder='请填写周报标题' onChange={this.WeeklyV} />
                    </div>
                    <div className="ProblemUpCont">
                        <p>问题内容:</p>
                        <TextArea placeholder="请填写周报内容" className="ProblemUpContInput2" rows={4} onChange={this.ProblemV} />
                    </div>
                    <div className="ProblemUpCont">
                        <div className="ProblemUpContBtn">
                            <Button type="primary" size='large' icon="check" onClick={this.addComp}>提问</Button>
                            <Button size='large' icon="undo" onClick={this.balckComp}>返回</Button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="ProblemDown">
                    <Table rowKey={row => row.times} pagination={false} columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
}

export default withRouter(problem);