import React, { useEffect, useState } from 'react';
import { Menu, Layout, Typography } from 'antd';
import { router, useRouter, RouteLocation } from '@pickjunk/min';
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

  const [def, setDef] = useState({
    defaultOpenKeys: [] as string[],
    defaultSelectedKeys: [] as string[],
  });
  useEffect(function () {
    function walk(
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
          const { openKeys, selectedKey } = walk(children);
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

    const { openKeys, selectedKey } = walk(items);
    console.log(openKeys, selectedKey);
    setDef({
      defaultOpenKeys: openKeys,
      defaultSelectedKeys: [selectedKey],
    });
  }, []);

  function renderItems(items: MenuItem[]) {
    return items.map(({ icon, title, children }) => {
      if (children) {
        return (
          <Menu.SubMenu key={title} icon={icon} title={title}>
            {renderItems(children)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={title} icon={icon}>
          {title}
        </Menu.Item>
      );
    });
  }

  return (
    <Menu mode="inline" theme="dark" {...def}>
      {renderItems(items)}
    </Menu>
  );
}

export default function Basic() {
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
        <Content
          className="content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
