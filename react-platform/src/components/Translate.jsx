import React, { Component, Fragment } from "react";
import { Table, Input, Button, Icon, Divider, Modal, Spin } from "antd";
import Highlighter from "react-highlight-words";
import "./Translate.scss";
import qs from "qs";
import * as TranslateAPI from "../utils/TanslateAPI";

class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      visible: false,
      record: "",
      index: ""
    };
  }

  componentDidMount = () => {
    TranslateAPI.all()
      .then(response => {
        this.setState({
          data: response.data,
          loading: false
        });
      })
      .catch(error => console.log(error));
  };

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

  handleUpload = (record, index, e) => {
    let formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    formdata.append("articleid", record.articleid);

    if (formdata) {
      TranslateAPI.upload(formdata)
        .then(response => {
          //通过服务器返回值更新finishtime
          let data = this.state.data;
          data[index].finishtime = response.data;
          this.setState({
            data
          });
          console.log(response);
        })
        .catch(error => console.log(error));
    } else {
      console.log("木有");
    }
  };

  handleDownload = record => {
    TranslateAPI.download(record.articleid);
  };

  handleFinish = () => {
    let record = this.state.record;
    let index = this.state.index;
    TranslateAPI.finish(qs.stringify({ articleid: record.articleid }))
      .then(response => {
        let data = this.state.data;
        data[index].status = "完成";
        this.setState({
          data
        });
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };

  showModal = (record, index) => {
    this.setState({
      visible: true,
      record: record,
      index: index
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
    this.handleFinish();
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const columns = [
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
        width: "15%",
        ...this.getColumnSearchProps("author")
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "15%",
        ...this.getColumnSearchProps("type")
      },
      {
        title: "UploadTime",
        dataIndex: "uploadtime",
        key: "uploadtime",
        width: "20%",
        ...this.getColumnSearchProps("uploadtime")
      },
      {
        title: "LastTime",
        dataIndex: "finishtime",
        key: "finishtime",
        width: "20%",
        ...this.getColumnSearchProps("finishtime")
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%",
        sorter: (a, b) => a.status.localeCompare(b.status)
      },
      {
        title: "Action",
        key: "articleid",
        render: (text, record, index) => (
          <Fragment>
            <a>
              <input
                type="file"
                className="file"
                encType="multipart/form-data"
                onChange={e => this.handleUpload(record, index, e)}
              />
              上传
            </a>
            <Divider type="vertical" />
            <a onClick={() => this.handleDownload(record)}>下载</a>
            <Divider type="vertical" />
            <a onClick={() => this.showModal(record, index)}>完成</a>
          </Fragment>
        )
      }
    ];
    return (
      <div className="loading-baba">
        {this.state.loading === true ? (
          <Spin className="loading" size="large" />
        ) : (
          <div>
            <Table columns={columns} dataSource={this.state.data} />
            <Modal
              title="警告"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>
                确定完成<font color="#1890FF">{this.state.record.author}</font>
                同学的<font color="#1890FF">{this.state.record.type}</font>
                翻译吗？
              </p>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default Translate;
