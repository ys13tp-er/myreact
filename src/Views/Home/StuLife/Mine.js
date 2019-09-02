import React, { Component } from 'react';
import { Button, Card, Icon } from 'antd';

const { Meta } = Card;

class mine extends Component {
    render() {
        return (
            <div className="Mine">
                <div className="MineCont">
                    <div className="MineContBtn">
                        <Button style={{ width: '100px', height: '30px' }} type="primary">修改</Button>
                    </div>
                    <div className="MineContMine">
                        <div className="MineContMineL">
                            <Card
                                hoverable
                                style={{ width: 180 }}
                                cover={<img alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566554552583&di=69161d4567be08585919406f9e300113&imgtype=0&src=http%3A%2F%2Fs16.sinaimg.cn%2Fbmiddle%2F005P72xtzy75c8kj7rxef%26690" />}
                            >
                                <Meta className="MineContMineLName" avatar={<Icon style={{ lineHeight: '24px', color: '#58bc58', height: '24px' }} type="down-circle" theme="filled" />} title="小明 （男）" />
                            </Card>
                        </div>
                        <div className="MineContMineR">
                            <div className="MineContMineRCont">
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">身份证号码</p>
                                    <p className="MineContMineRContR">********************</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">手机号</p>
                                    <p className="MineContMineRContR">********************</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">QQ</p>
                                    <p className="MineContMineRContR">********************</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">学号</p>
                                    <p className="MineContMineRContR">GZ123456789</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">毕业学院</p>
                                    <p className="MineContMineRContR">江西理工    信息工程学院</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">在校状态</p>
                                    <p className="MineContMineRContR">待业</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">学历</p>
                                    <p className="MineContMineRContR">本科</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">千锋班级</p>
                                    <p className="MineContMineRContR">广州HTML5就业班1905期</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">招生老师</p>
                                    <p className="MineContMineRContR">关姐</p>
                                </div>
                                <div className="MineContMineRContLR">
                                    <p className="MineContMineRContL">报名日期</p>
                                    <p className="MineContMineRContR">2019-03-23</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="MineContMassage">
                        <div className="MineContMassageGroup">
                            <div className="MineContMassageGroup1T">[<b>我的消息</b>]</div>
                            <div className="MineContMassageGroup1C">
                                <p>消息内容</p>
                                <p>时间</p>
                            </div>
                        </div>
                        <div className="MineContMassageGroup">
                            <div className="MineContMassageGroup1T">[<b>班主任寄语</b>]</div>
                            <div className="MineContMassageGroup2C">
                                <p>评价老师</p>
                                <p>寄语内容</p>
                                <p>时间</p>
                            </div>
                        </div>
                        <div className="MineContMassageGroup">
                            <div className="MineContMassageGroup1T">[<b>千锋其他会员开通</b>]</div>
                            <div className="MineContMassageGroup3C MineContMassageGroup3C1">
                                <p>产品名称</p>
                                <p>产品描述</p>
                                <p>开通信息</p>
                            </div>
                            <div className="MineContMassageGroup3C MineContMassageGroup3C2">
                                <p>扣丁学堂</p>
                                <p>扣丁学堂大量免费线上视频，不定期更新，为您规划职业路线。<br />
                                    官方网站:<Button type="link" href="http:/www.codingke.com">http:/www.codingke.com</Button></p>
                                <p>您还未开通扣丁学堂 <Button>立即开通</Button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default mine;