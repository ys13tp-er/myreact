import React, { Component } from 'react';
import { Table } from 'antd';

class Inquiry extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const dataSource = [];

        const columns = [
            {
                title: '开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
                align: 'center'
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime',
                align: 'center'
            },
            {
                title: '测评名称',
                dataIndex: 'obj',
                key: 'obj',
                align: 'center'
            },
            {
                title: '讲师',
                dataIndex: 'teacher',
                key: 'teacher',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'center'
            },
        ];
        return (
            <div style={{ padding: '8px 20px 24px' }}>
                <Table rowKey={row => row.startTime} pagination={false} style={{ minWidth: '825px' }} bordered dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default Inquiry;