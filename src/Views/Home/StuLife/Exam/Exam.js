import React, { Component } from 'react';

class Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examlistdata: []
        };
    }

    componentWillMount() {
        // 考试列表数据的获取
        const _this = this;
        React.$axios.get("https://www.easy-mock.com/mock/5d4041cad3d96f3926d5d9fc/nav/kaoshi")
            // 请求成功
            .then(function (response) {
                // console.log(response);
                let userInf = response.data;
                // console.log(userInf);

                _this.setState(
                    { examlistdata: userInf }
                );
            })
    }

    render() {
        return (
            <div className="Exam">
                <div className="ExamTitle">考试列表</div>
                <div className="ExamTop"></div>
                <div className="ExamScore">
                    {
                        this.state.examlistdata.map((item, index) => {
                            return (<div key={index} className="ExamScoreItem">
                                <div className="ExamScoreDefen">已考</div>
                                <h2>{item.h2data}</h2>
                                <p>考试时间：90分钟</p>
                                <p>总分数：100分</p>
                                <p>
                                    考试范围：
                                <span>{item.p1};<br />{item.p2};<br />{item.p3};<br /></span>
                                </p>
                                <p>考试时间：2019-07-05</p>
                            </div>)
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Exam;