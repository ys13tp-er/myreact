import React, { Component } from 'react';
import { Table } from 'antd';

class Discipline extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const dataSource = [
            {
                username: '小明',
                type: '迟到',
                reduce: '2',
                sort: '98',
                reason: '迟到',
                operator: '班主任',
                operateTime: '2019-08-24 11:32'
            }
        ];

        const columns = [
            {
                title: '姓名',
                dataIndex: 'username',
                key: 'username',
                align: 'center'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                align: 'center'
            },
            {
                title: '扣除（分数）',
                dataIndex: 'reduce',
                key: 'reduce',
                align: 'center'
            },
            {
                title: '剩余分数',
                dataIndex: 'sort',
                key: 'sort',
                align: 'center'
            },
            {
                title: '理由',
                dataIndex: 'reason',
                key: 'reason',
                align: 'center'
            },
            {
                title: '操作人',
                dataIndex: 'operator',
                key: 'operator',
                align: 'center'
            },
            {
                title: '操作时间',
                dataIndex: 'operateTime',
                key: 'operateTime',
                align: 'center'
            }
        ];
        return (
            <div style={{ padding: '8px 20px 24px' }}>
                <Table rowKey={row => row.operateTime} pagination={false} style={{ minWidth: '825px' }} bordered dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default Discipline;