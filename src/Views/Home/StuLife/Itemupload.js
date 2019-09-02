import React, { Component } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';



class itemupload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false
        };
    }

    // 文件上传函数
    handleChange = (info) => {
        if (info.file.status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // console.log(info.file, info.fileList);
            // 上传成功后设置成功标志
            this.setState(
                { uploading: true }
            );
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    // 发送
    addComp = () => {
        // console.log(this.state.complaintValue);
        if (this.state.uploading) {
            // 发送

            // 提示
            message.info('上传成功', 2)
        } else {
            message.info('上传文件不能为空', 2)
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
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange: this.handleChange.bind(this)
        };
        return (
            <div className="Itemupload">
                <h3 className="ItemuploadTitle">学员项目上传</h3>
                <div className="ItemuploadCont">
                    <div className="ItemuploadCont2">
                        <div style={{ padding: '0 12px' }}>
                            <div className="ItemuploadContUp">
                                <p className="ItemuploadContUpL">项目文件：</p>
                                <Upload {...props} className="ItemuploadContUpM">
                                    <Button>
                                        <Icon type="upload" /> 选择文件
                                    </Button>
                                </Upload>
                                <p className="ItemuploadContUpR">注：请上传格式为【zip,rar】的压缩包,上传大小不得超过10M！</p>
                            </div>
                            <div className="ItemuploadContBtn">
                                <div style={{
                                    width: '300px', display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <Button type="primary" size='large' icon="check" onClick={this.addComp}>提交</Button>
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

export default withRouter(itemupload);