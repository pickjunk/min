import React, { useState } from 'react';
import { Menu, Layout, Typography, PageHeader, Card, Spin } from 'antd';
import { router, useRouter, RouteLocation, Link } from '@pickjunk/min';
import Icon from '../assets/icon';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
// @ts-ignore
import logo from '../assets/logo.png';
import clsx from 'clsx';
import './basic.less';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface MenuItem extends RouteLocation {
  icon?: React.ReactElement;
  title: string;
  children?: MenuItem[];

  active?: boolean;
}

const items: MenuItem[] = [
  {
    icon: <StepBackwardOutlined />,
    title: '第一页',
    name: 'one',
  },
  {
    icon: <StepForwardOutlined />,
    title: '第二页',
    name: 'two',
  },
  {
    icon: <AppleOutlined />,
    title: '子菜单',
    children: [
      {
        icon: <Icon type="icon-h" />,
        title: 'H5',
        name: 'h5',
      },
      {
        icon: <Icon type="icon-xiaochengxu" />,
        title: '小程序',
        name: 'weapp',
      },
    ],
  },
];

function SiderMenu() {
  const { location } = useRouter();
  const [lPath] = location.split('?');

  function getKeys(
    items: MenuItem[],
  ): {
    openKeys: string[];
    selectedKey: string;
  } {
    for (let { title, name, path, args, children } of items) {
      const key = router.link({
        name,
        path,
        args,
      });
      const [kPath] = key.split('?');
      if (kPath == lPath) {
        return {
          openKeys: [],
          selectedKey: title,
        };
      }

      if (children) {
        const { openKeys, selectedKey } = getKeys(children);
        if (selectedKey) {
          openKeys.push(title);
          return {
            openKeys,
            selectedKey,
          };
        }
      }
    }

    return {
      openKeys: [],
      selectedKey: '',
    };
  }

  function renderItems(items: MenuItem[]) {
    return items.map(({ icon, title, name, path, args, children }) => {
      if (children) {
        return (
          <Menu.SubMenu key={title} icon={icon} title={title}>
            {renderItems(children)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={title} icon={icon}>
          <Link name={name} path={path} args={args}>
            {title}
          </Link>
        </Menu.Item>
      );
    });
  }

  const { openKeys, selectedKey } = getKeys(items);
  const children = renderItems(items);

  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={[selectedKey]}
    >
      {children}
    </Menu>
  );
}

export default function Basic({ children }: { children: React.ReactNode }) {
  const { loading } = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout id="basic">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className={clsx({
            logo: true,
            collapsed,
          })}
        >
          <img src={logo} />
          <Title level={5} ellipsis>
            MIN Example
          </Title>
        </div>
        <SiderMenu />
      </Sider>
      <Layout>
        <Header className="header" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggleCollapsed} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggleCollapsed} />
          )}
        </Header>
        <Content className="content">
          <Spin spinning={loading}>
            <PageHeader className="page-header"></PageHeader>
            <Card>{children}</Card>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
}
