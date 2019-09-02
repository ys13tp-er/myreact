import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Modal, message, Table, DatePicker, Select } from 'antd';
import qs from 'qs';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

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

class Leave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            LeaveValue: '',
            LeaveTable: [],

            LeaveSdata: '',
            LeaveSdataH: '8',
            LeaveSdataM: '00',

            LeaveEdata: '',
            LeaveEdataH: '13',
            LeaveEdataM: '00',
        };
    }


    // 获取表格数据
    getProData = () => {
        let newusernumb = localStorage.getItem('usernumb');
        // 获取用户问题数据
        const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        React.$axios.get(
            "http://localhost:3000/qfmdb/gitLeave",
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
                        pro: userInf[i].pro,
                        leavedate: userInf[i].leavedate,
                        times: timesV,
                        Mresss: userInf[i].Mresss,
                        Tresss: userInf[i].Tresss
                    })
                }
                // console.log(nowdata);
                _this.setState(
                    { LeaveTable: nowdata }
                );
            })
    }

    // 存问题
    ProblemV = e => {
        this.setState(
            { LeaveValue: e.target.value }
        );
    }

    // 发送问题
    addComp = () => {
        // console.log(this.state.complaintValue);
        if (this.state.LeaveValue) {
            Modal.confirm({
                content: '确定提交？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    console.log('确定');
                    // 获取的时间戳是把毫秒改成000显示，
                    let times = Date.parse(new Date());
                    // console.log(times);
                    // 请假时间
                    let leavedate = this.state.LeaveSdata + ' ' + this.state.LeaveSdataH + ':' + this.state.LeaveSdataM + ' -' + this.state.LeaveEdata + ' ' + this.state.LeaveEdataH + ':' + this.state.LeaveEdataM
                    // console.log(leavedate);
                    // 发送请求提交
                    React.$axios.post('http://localhost:3000/qfmdb/insertLeave', qs.stringify({
                        username: this.state.username,
                        usernumb: this.state.usernumb,
                        pro: this.state.LeaveValue,
                        leavedate: leavedate,
                        times: times,
                        Mresss: '待审批',
                        Tresss: '待审批'
                    }))
                        .then(res => {
                            // console.log('res=>', res);
                            if (res.data.result.n) {
                                // console.log('插入成功');
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
            { LeaveValue: '' }
        );
        this.props.history.goBack();
    }

    // 日期选择
    onChange = (date, dateString) => {
        // console.log(date, dateString);
        this.setState({
            LeaveSdata: dateString
        });
    }
    onChange2 = (date, dateString) => {
        // console.log(date, dateString);
        this.setState({
            LeaveEdata: dateString
        });
    }

    // 开始时间 时+分 选择
    handleChange1 = value => {
        // console.log(value);
        this.setState({
            LeaveSdataH: value
        });
    }
    handleChange2 = value => {
        // console.log(value);
        this.setState({
            LeaveSdataM: value
        });
    }

    // 结束时间 时+分 选择
    handleChange3 = value => {
        // console.log(value);
        this.setState({
            LeaveEdataH: value
        });
    }
    handleChange4 = value => {
        // console.log(value);
        this.setState({
            LeaveEdataM: value
        });
    }

    componentWillMount() {
        // 用户信息获取
        let nawusername = localStorage.getItem('username');
        let newusernumb = localStorage.getItem('usernumb');
        // 获取的时间戳是把毫秒改成000显示，
        let times = Date.parse(new Date());
        // 转换为YYYY-MM-DD
        let timesV = msToDate(times - 0).hasTime;
        // v-m
        this.setState({
            username: nawusername,
            usernumb: newusernumb,
            LeaveSdata: timesV
        });
        // 获取数据
        this.getProData();
    }

    componentWillUnmount() {
        //销毁对话框，避免内存泄漏
        Modal.destroyAll();
    }


    render() {

        // 表格表头
        const columns = [
            {
                title: '姓名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '请假理由',
                dataIndex: 'pro',
                key: 'pro',
            },
            {
                title: '班主任审批',
                key: 'Mresss',
                dataIndex: 'Mresss'
            },
            {
                title: '讲师审批',
                key: 'Tresss',
                dataIndex: 'Tresss'
            },
            {
                title: '请假时间',
                key: 'leavedate',
                dataIndex: 'leavedate'
            },
            {
                title: '创建时间',
                key: 'times',
                dataIndex: 'times'
            }
        ];

        // 问题列表数据
        const data = this.state.LeaveTable;

        return (
            <div className="Problem">
                <div className="ProblemUp">
                    <div className="ProblemUpCont">
                        <p>学员姓名:</p>
                        <Input className="ProblemUpContInput1" disabled placeholder={this.state.username} />
                    </div>
                    <div className="ProblemUpCont">
                        <p>问题内容:</p>
                        <TextArea placeholder="请输入技术内容" className="ProblemUpContInput2" rows={4} onChange={this.ProblemV} />
                    </div>
                    <div className="ProblemUpCont">
                        <p>请假时间:</p>
                        <DatePicker style={{ width: '116px' }} onChange={this.onChange} defaultValue={moment(this.state.LeaveSdata, 'YYYY-MM-DD')} allowClear={false} />
                        <Select defaultValue="8" style={{ width: 60 }} onChange={this.handleChange1}>
                            <Option value="8">8</Option>
                            <Option value="9">9</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                            <Option value="13">13</Option>
                            <Option value="14">14</Option>
                            <Option value="15">15</Option>
                            <Option value="16">16</Option>
                            <Option value="17">17</Option>
                            <Option value="18">18</Option>
                            <Option value="19">19</Option>
                            <Option value="20">20</Option>
                            <Option value="21">21</Option>
                            <Option value="22">22</Option>
                        </Select>
                        <Select defaultValue="00" style={{ width: 60 }} onChange={this.handleChange2}>
                            <Option value="00">00</Option>
                            <Option value="30">30</Option>
                        </Select>
                        <span>&nbsp;----&nbsp;</span>
                        <DatePicker style={{ width: '116px' }} onChange={this.onChange2} defaultValue={moment(this.state.LeaveSdata, 'YYYY-MM-DD')} allowClear={false} />
                        <Select defaultValue="13" style={{ width: 60 }} onChange={this.handleChange3}>
                            <Option value="13">13</Option>
                            <Option value="14">14</Option>
                            <Option value="15">15</Option>
                            <Option value="16">16</Option>
                            <Option value="17">17</Option>
                            <Option value="18">18</Option>
                            <Option value="19">19</Option>
                            <Option value="20">20</Option>
                            <Option value="21">21</Option>
                            <Option value="22">22</Option>
                        </Select>
                        <Select defaultValue="00" style={{ width: 60 }} onChange={this.handleChange4}>
                            <Option value="00">00</Option>
                            <Option value="30">30</Option>
                        </Select>
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

export default withRouter(Leave);
