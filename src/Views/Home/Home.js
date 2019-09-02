import React, { Component } from 'react';
import { withRouter, HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, Button, Modal, Breadcrumb } from 'antd';

// 引入子组件
import Complaint from './StuLife/Complaint';
import Problem from './StuLife/Problem';
import Itemupload from './StuLife/Itemupload';
import StuVip from './StuLife/StuVip';
import Weekly from './StuLife/Weekly';
import Mine from './StuLife/Mine';
import MoneyDetail from './StuLife/MoneyDetail';
import Exam from './StuLife/Exam/Exam';
import Evaluate from './StuLife/Evaluate/Evaluate';
import Inquiry from './StuLife/Inquiry/Inquiry';

import Leave from './StuToShool/Leave';
import Discipline from './StuToShool/Discipline';

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;
const { SubMenu } = Menu;

const router = new HashRouter();

function quit() {
    // console.log(1);
    confirm({
        title: '你是否确认退出登录?',
        content: '',
        onOk() {
            console.log('OK');
            // 退出清除保存的用户信息
            localStorage.clear();
            // 跳转到登录页
            router.history.push('/login');
        },
        onCancel() { },
    });
}

const menu = (
    <Menu>
        <Menu.Divider />
        <Menu.Item key="0">
            <Button type="link" style={{ width: '158px', textAlign: 'left', color: '#000' }} onClick={quit}><Icon type="poweroff" />退出</Button>
        </Menu.Item>
    </Menu>
);

// 面包屑
const breadcrumbNameMap = {
    '/home': '学员后台',
    '/home/complaint': '匿名投诉',
    '/home/Problem': '技术问题',
    '/home/Itemupload': '项目上传',
    '/home/StuVip': 'VIP',
    '/home/Weekly': '学员周报',
    '/home/Mine': '我的资料',
    '/home/MoneyDetail': '交费明细',
    '/home/Exam': '参加考试',
    '/home/Evaluate': '学员评价',
    '/home/Inquiry': '教学测评',
    '/home/Leave': '学员请假',
    '/home/Discipline': '学员违纪'
};

class Home extends Component {
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2'];

    constructor(props) {
        super(props);
        this.state = {
            // 侧边栏控制
            collapsed: false,
            openKeys: ['sub1'],
            // 用户信息
            username: 'username',
            token: ''
        };
    }



    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    onCollapse = collapsed => {
        // console.log(collapsed);
        this.setState({ collapsed });
    };

    componentWillMount() {
        // 用户信息获取
        let nawusername = localStorage.getItem('username');
        this.setState({
            username: nawusername
        });
    }

    // 简单版守卫
    componentDidMount() {
        // 判断是否登录，没登陆跳转登录页
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login')
        }
    }


    render() {

        // 面包屑
        const { location } = this.props;
        // console.log(location.pathname);
        const mypathname = location.pathname;
        const pathSnippets = mypathname.split('/').filter(i => i);
        // console.log(pathSnippets);
        const breadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbNameMap[url]}</Link>
                </Breadcrumb.Item>
            );
        });
        // console.log(breadcrumbItems);

        return (
            <div>
                <Layout className="homeBox" style={{ background: '#fff' }}>
                    <Header className="homeHeader" style={{
                        color: "#fff", height: '50px',
                        background: '#428bca', padding: 0
                    }}>
                        <div className="logo">
                            <img style={{ display: 'block' }} src={require("../../assets/logo.png")} alt="千峰教育" />
                        </div>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button style={{ color: '#fff', float: 'right', lineHeight: '50px', height: '50px', fontSize: '12px' }} className="ant-dropdown-link" type="link">{this.state.username}<Icon type="down" /></Button>
                        </Dropdown>,
                    </Header>
                    <Layout>
                        <Sider breakpoint="lg" theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ overflow: 'auto', background: '#f2f2f2' }}>
                            <div className="logo" />
                            <Menu
                                theme="light"
                                onOpenChange={this.onOpenChange}
                                openKeys={this.state.openKeys}
                                defaultSelectedKeys={['/home/Mine']}
                                selectedKeys={[this.props.history.location.pathname]}
                                mode="inline"
                            >
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            <Icon type="user" />
                                            <span>学员后台</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="/home/complaint">
                                        <Link to="/home/complaint">匿名投诉</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/Problem">
                                        <Link to="/home/Problem">技术问题</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/Itemupload">
                                        <Link to="/home/Itemupload">项目上传</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/StuVip">
                                        <Link to="/home/StuVip">VIP</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/Weekly">
                                        <Link to="/home/Weekly">学员周报</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/Mine">
                                        <Link to="/home/Mine">我的资料</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/MoneyDetail">
                                        <Link to="/home/MoneyDetail">交费明细</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/Exam">
                                        <Link to="/home/Exam">参加考试</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/Evaluate">
                                        <Link to="/home/Evaluate">学员评价</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/Inquiry">
                                        <Link to="/home/Inquiry">教学测评</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <Icon type="team" />
                                            <span>学员考勤</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="/home/Leave">
                                        <Link to="/home/Leave">学员请假</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/home/Discipline">
                                        <Link to="/home/Discipline">学员违纪</Link>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content className="homeCont" style={{ background: '#fff' }}>
                            <div className="homeContBeard">
                                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                            </div>
                            <div className="homeContRouter">
                                <div className="homeContspace"></div>
                                <div>
                                    <Switch>
                                        <Route path="/home/complaint" component={Complaint} />
                                        <Route path="/home/Problem" component={Problem} />
                                        <Route path="/home/Itemupload" component={Itemupload} />
                                        <Route path="/home/StuVip" component={StuVip} />
                                        <Route path="/home/Weekly" component={Weekly} />
                                        <Route path="/home/Mine" component={Mine} />
                                        <Route path="/home/MoneyDetail" component={MoneyDetail} />
                                        <Route path="/home/Exam" component={Exam} />
                                        <Route path="/home/Evaluate" component={Evaluate} />
                                        <Route path="/home/Inquiry" component={Inquiry} />

                                        <Route path="/home/Leave" component={Leave} />
                                        <Route path="/home/Discipline" component={Discipline} />
                                        <Redirect from="/home/" to="/home/Mine"></Redirect>
                                    </Switch>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div >
        );
    }
}

export default withRouter(Home);