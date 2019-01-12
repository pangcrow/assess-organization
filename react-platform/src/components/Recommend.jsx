import React, { Component } from "react";
import {
  Table,
  Input,
  Button,
  Icon,
  Divider,
  Drawer,
  Collapse,
  Modal,
  message,
  Spin
} from "antd";
import Highlighter from "react-highlight-words";
import * as RecommendAPI from "../utils/RecommendAPI";
import "./Recommend.scss";
import qs from "qs";

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [], //首页待推荐学生信息
      school: [], //院校信息
      visible: false, //侧栏显示
      childrenDrawer: false, //子侧栏显示
      schoolnumber: "", //选择院校时，对应第一还是第二的数字
      first: "First School", //选择院校时暂存的第一选择内容，关闭侧栏后恢复为First School
      second: "Second School",//同上
      currindex: "", //当前所操纵的index，注：不是数据库的id，是data的index
      modal: "",
      modalName: "",
      modalRecommend: ""
    };
  }

  componentDidMount() {
    //获取需要推荐的信息
    RecommendAPI.selectNeed()
      .then(response =>
        this.setState({
          data: response.data,
          loading: false
        })
      )
      .catch(error => console.log(error));
    //获取所有院校信息
    RecommendAPI.selectSchool()
      .then(response => {
        this.setState({
          school: response.data
        });
      })
      .catch(error => console.log(error));
  }

  //字段搜索 直接copy antd的
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div className="custom-filter-dropdown">
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text}
      />
    )
  });
  //确认搜索
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };
  //取消搜索结果
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  //显示侧栏抽屉
  showDrawer = index => {
    this.setState({
      visible: true,
      currindex: index
    });
  };
  //关闭侧栏
  onClose = () => {
    this.setState({
      visible: false,
      first: "First School",
      second: "Second School",
      currindex: ""
    });
  };
  //显示子侧栏
  showChildrenDrawer = schoolnumber => {
    this.setState({
      childrenDrawer: true,
      schoolnumber
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false
    });
  };

  handleAddSchool = key => {
    console.log(key);
    console.log(this.state.schoolnumber);
    if (this.state.schoolnumber === "未推荐") {
      this.setState({
        first: this.state.school[key].name
      });
    } else {
      this.setState({
        second: this.state.school[key].name
      });
    }
  };
  //提交要推荐的院校
  handleSubmit = () => {
    let index = this.state.currindex;
    RecommendAPI.addSchool(
      qs.stringify({
        first: this.state.first !== "First School" ? this.state.first : null,
        second:
          this.state.second !== "Second School" ? this.state.second : null,
        assessid: this.state.data[index].assessid
      })
    )
      .then(response => {
        let data = this.state.data;
        let index = this.state.currindex;
        if (this.state.first !== "First School") {
          data[index].first = this.state.first;
        }
        if (this.state.second !== "Second School") {
          data[index].second = this.state.second;
        }
        this.setState({
          data
        });
        this.onClose();
      })
      .catch(error => console.log(error));
  };
  //显示确认推荐
  showConfirm = index => {
    this.setState({
      modal: true,
      currindex: index,
      modalName: this.state.data[index].name,
      modalRecommend: this.state.data[index].recommend
    });
  };

  handleOk = () => {
    this.setState({
      modal: false
    });
    let id = this.state.data[this.state.currindex].assessid;
    RecommendAPI.recommend(qs.stringify({ assessid: id }))
      .then(response => {
        console.log(response.data);
        let data = this.state.data;
        data[this.state.currindex].needrecommend = "已推荐";
        this.setState({
          data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCancel = () => {
    this.setState({
      modal: false
    });
  };

  render() {
    const info = () => {
      message.info("该学生已推荐！");
    };
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        with: "10%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        with: "10%",
        ...this.getColumnSearchProps("phone")
      },
      {
        title: "CurrentSchool",
        dataIndex: "currschool",
        key: "currschool",
        with: "10%",
        ...this.getColumnSearchProps("currschool")
      },
      {
        title: "FirstSchool",
        dataIndex: "first",
        key: "first",
        with: "15%"
      },
      {
        title: "SecondSchool",
        dataIndex: "second",
        key: "second",
        with: "15%"
      },
      {
        title: "ConfirmSchool",
        dataIndex: "recommend",
        key: "recommend",
        with: "15%"
      },
      {
        title: "Status",
        dataIndex: "needrecommend",
        key: "needrecommend",
        with: "10%",
        sorter: (a, b) => a.needrecommend.localeCompare(b.needrecommend)
      },
      {
        title: "Action",
        key: "action",
        render: (text, record, index) => (
          <span>
            {this.state.data[index].needrecommend === "已推荐" ? (
              <a onClick={info}>选择院校</a>
            ) : (
              <a onClick={() => this.showDrawer(index)}>选择院校</a>
            )}
            <Divider type="vertical" />
            {this.state.data[index].needrecommend === "已推荐" ? (
              <a onClick={info}>确认推荐</a>
            ) : (
              <a onClick={() => this.showConfirm(index)}>确认推荐</a>
            )}
          </span>
        )
      }
    ];

    return (
      <div className="loading-baba">
        {this.state.loading === true ? (
          <Spin className="loading" size="large" />
        ) : (
          <div className="assess">
            <Table columns={columns} dataSource={this.state.data} />

            <Drawer
              title="院校推荐"
              width={520}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <Button
                type="default"
                onClick={() => this.showChildrenDrawer("未推荐")}
                style={{ minWidth: "180px" }}
              >
                {this.state.first}
              </Button>
              <br />
              <br />
              <br />
              <Button
                type="default"
                onClick={() => this.showChildrenDrawer("已推荐")}
                style={{ minWidth: "180px" }}
              >
                {this.state.second}
              </Button>

              <Drawer
                title="院校选择"
                width={400}
                closable={false}
                onClose={this.onChildrenDrawerClose}
                visible={this.state.childrenDrawer}
              >
                <Collapse accordion bordered={false}>
                  {/* 遍历显示school内容 */}
                  {this.state.school.map((item, key) => (
                    <Collapse.Panel header={item.name} key={key}>
                      Ranking : {item.ranking}
                      <br />
                      Address : {item.country} {item.address}
                      <br />
                      Tuition : {item.tuition}
                      <br />
                      Remark : {item.remark}
                      <br />
                      <div
                        style={{
                          width: "100%",
                          textAlign: "right"
                        }}
                      >
                        <Button
                          shape="circle"
                          icon="plus"
                          size="small"
                          onClick={() => this.handleAddSchool(key)}
                        />
                      </div>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </Drawer>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  borderTop: "1px solid #e8e8e8",
                  padding: "10px 16px",
                  textAlign: "right",
                  left: 0,
                  background: "#fff",
                  borderRadius: "0 0 4px 4px"
                }}
              >
                <Button
                  style={{
                    marginRight: 8
                  }}
                  onClick={this.onClose}
                >
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                  Submit
                </Button>
              </div>
            </Drawer>
            <Modal
              title="警告"
              visible={this.state.modal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>
                确定推荐<font color="#1890FF">{this.state.modalName}</font>该到
                <font color="#1890FF">{this.state.modalRecommend}</font>吗？
              </p>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default Recommend;
