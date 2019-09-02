import React, { Component } from 'react';

class moneyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="MoneyDetail">
                <div style={{ padding: '12px' }}>
                    <h3 style={{ padding: '0 0 10px', borderBottom: '1px dotted #e2e2e2', textAlign: 'center', fontSize: '22px' }}>交费详情</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>标题</td>
                                <td>金额</td>
                                <td>收据号/订单号</td>
                                <td>收据编号</td>
                                <td>入账地点</td>
                                <td>类型</td>
                                <td>操作人</td>
                                <td>状态</td>
                                <td>添加时间</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                    </table>
                    <h3 style={{ padding: '0 0 10px', borderBottom: '1px dotted #e2e2e2', textAlign: 'center', fontSize: '22px' }}>退费详情</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>标题</td>
                                <td>金额</td>
                                <td>收据号</td>
                                <td>收据编号</td>
                                <td>退费地点</td>
                                <td>操作人</td>
                                <td>添加时间</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        );
    }
}

export default moneyDetail;