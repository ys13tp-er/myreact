import React, { Component } from 'react';
import { Alert, Icon, Table } from 'antd';

class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const columns = [
            {
                title: '测评开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
                align: 'center'
            },
            {
                title: '测评结束时间',
                dataIndex: 'endTime',
                key: 'endTime',
                align: 'center'
            },
            {
                title: '评价对象',
                dataIndex: 'obj',
                key: 'obj',
                align: 'center',
                width: '300px'
            },
            {
                title: '讲师',
                dataIndex: 'teacher',
                key: 'teacher',
                align: 'center'
            },
            {
                title: '班主任',
                dataIndex: 'mist',
                key: 'mist',
                align: 'center'
            },
            {
                title: '就业老师',
                dataIndex: 'toObj',
                key: 'toObj',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'option',
                key: 'option',
                align: 'center'
            },
        ];

        const dataSource = [];
        return (
            <div className="evaluate">
                <div className="evaluateHeader">
                    <Alert style={{
                        margin: '0 0 12px',
                        paddingBottom: '16px',
                        paddingTop: '16px',
                        minWidth: '825px'
                    }} icon={<Icon style={{ top: '20px' }} type="check" />} message={<span style={{ color: '#468847' }}>您的满意是对我们最好的评价，您的批评是给我们最大的改进动力，欢迎同学对千锋提出宝贵的批评和建议。</span>} type="success" showIcon />
                </div>
                <div className="evaluateCont">
                    <Table rowKey={row => row.startTime} style={{ minWidth: '825px' }} bordered dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}

export default Evaluate;