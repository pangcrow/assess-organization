import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import logo from "../static/logo.svg";
import "./Navigantion.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Translate from "./Translate";
import Assess from "./Assess";
import Recommend from "./Recommend";

const { Header, Sider, Content } = Layout;

class Navigantion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="sider">
            <div id="title">
              <img src={logo} className="App-logo" alt="logo"/>
              {this.state.collapsed ? "" : <h2 id="title-name">评估机构</h2>}
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/">
                <Icon type="read" />
                  <span>翻译服务</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/assess">
                  <Icon type="solution" />
                  <span>评估服务</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/recommend">
                <Icon type="upload" />
                  <span>推荐院校</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 400
              }}
            >
              <Route exact path="/" component={Translate} />
              <Route path="/assess" component={Assess} />
              <Route path="/recommend" component={Recommend} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Navigantion;
