import React, { Component } from "react";
import { Table, Input, Button, Icon, Divider, Modal, Spin } from "antd";
import Highlighter from "react-highlight-words";
import * as AssessAPI from "../utils/AssessAPI";
import qs from "qs";

class Assess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoading: true,
      data: [],
      loading: false,
      saveLoading: false,
      visible: false,
      grade: "",
      comment: "",
      handlekey: "",
      handleindex: ""
    };
  }

  componentDidMount() {
    AssessAPI.all()
      .then(response =>
        this.setState({
          data: response.data,
          apiLoading: false
        })
      )
      .catch(error => console.log(error));
  }

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

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleDownload = record => {
    AssessAPI.download(record.assessid);
  };

  //评估相关handle
  showModal = (record, index) => {
    if (this.state.data[index].status != "已评估") {
      this.setState({
        grade: this.state.data[index].grade,
        comment: this.state.data[index].comment,
        handlekey: record.assessid,
        visible: true,
        handleindex: index
      });
    } else {
      Modal.info({
        title: "已评估，无法修改！"
      });
    }
  };

  handleSave = status => {
    if (status) {
      this.setState({ loading: true });
    } else {
      this.setState({ saveLoading: true });
    }
    let grade = this.state.grade;
    let comment = this.state.comment;
    let assessid = this.state.handlekey;

    AssessAPI.saveComment(qs.stringify({ assessid, grade, comment, status }))
      .then(response => {
        if (response.data == "success") {
          let index = this.state.handleindex;
          let data = this.state.data;
          data[index].comment = comment;
          data[index].grade = grade;
          if (status == "已评估") {
            data[index].status = "已评估";
          }
          this.setState({
            data
          });
          if (status) {
            this.setState({ loading: false, visible: false });
          } else {
            this.setState({ saveLoading: false, visible: false });
          }
        }
      })
      .catch(error => console.log(error));
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleGrade = e => {
    this.setState({
      grade: e.target.value
    });
  };

  handleComment = e => {
    this.setState({
      comment: e.target.value
    });
  };

  render() {
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
        with: "15%",
        ...this.getColumnSearchProps("phone")
      },
      {
        title: "CurrentSchool",
        dataIndex: "currschool",
        key: "currschool",
        with: "15%",
        ...this.getColumnSearchProps("currschool")
      },
      {
        title: "UploadTime",
        dataIndex: "uploadtime",
        key: "uploadtime",
        with: "20%",
        ...this.getColumnSearchProps("uploadtime")
      },
      {
        title: "Grade",
        dataIndex: "grade",
        key: "grade",
        with: "10%"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        with: "15%",
        sorter: (a, b) => a.status.localeCompare(b.status)
      },
      {
        title: "Action",
        key: "action",
        with: "15%",
        render: (text, record, index) => (
          <span>
            <a onClick={() => this.handleDownload(record)}>下载</a>
            <Divider type="vertical" />
            <a onClick={() => this.showModal(record, index)}>评估</a>
          </span>
        )
      }
    ];
    const { visible, loading, saveLoading } = this.state;
    return (
      <div className="loading-baba">
        {this.state.apiLoading === true ? (
          <Spin className="loading" size="large" />
        ) : (
          <div className="assess">
            <Table
              columns={columns}
              expandedRowRender={record =>
                record.comment ? (
                  <p style={{ margin: 0 }}>Comment：{record.comment}</p>
                ) : (
                  ""
                )
              }
              dataSource={this.state.data}
            />
            <Modal
              visible={visible}
              title="Assess"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button
                  key="save"
                  loading={saveLoading}
                  onClick={() => this.handleSave()}
                >
                  Save
                </Button>,
                <Button key="back" onClick={this.handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={() => this.handleSave("已评估")}
                >
                  Submit
                </Button>
              ]}
            >
              <Input
                placeholder="Please enter a grade"
                className="grade"
                onChange={this.handleGrade}
                value={this.state.grade}
              />
              <br />
              <br />
              <br />
              <Input.TextArea
                rows={6}
                placeholder="Please enter a comment"
                className="comment"
                onChange={this.handleComment}
                value={this.state.comment}
              />
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default Assess;
