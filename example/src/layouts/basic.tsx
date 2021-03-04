import React, { useState } from 'react';
import {
  Menu,
  Layout,
  Typography,
  PageHeader,
  Card,
  Spin,
  Avatar,
  Dropdown,
  Breadcrumb,
} from 'antd';
import { router, useRouter, RouteLocation, Link } from '@pickjunk/min';
import Icon from '../assets/icon';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppleOutlined,
  HomeOutlined,
  LoadingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
// @ts-ignore
import logo from '../assets/logo.png';
// @ts-ignore
import avatar from '../assets/images/avatar.png';
import clsx from 'clsx';
import { useBreadcrumb } from '../hooks/breadcrumb';
import { collapsed$, useCollapsed } from '../hooks/collapsed';
import config from '../config';
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
    icon: <HomeOutlined />,
    title: '首页',
    name: 'dashboard',
  },
  {
    icon: <LoadingOutlined />,
    title: '延迟加载',
    name: 'delay',
  },
  {
    icon: <AppleOutlined />,
    title: '子菜单',
    children: [
      {
        icon: <Icon type="icon-H" />,
        title: 'H5',
        name: 'h5',
      },
      {
        icon: <Icon type="icon-xiaochengxu1" />,
        title: '小程序',
        name: 'weapp',
      },
    ],
  },
];

function BasicMenu() {
  const { location } = useRouter();
  const [lPath] = location.split('?');

  const collapsed = useCollapsed();

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
    <Sider
      className="menu"
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={48}
    >
      <div
        className={clsx({
          logo: true,
          collapsed,
        })}
      >
        <img src={logo} />
        <Title level={5} ellipsis>
          {config.app}
        </Title>
      </div>
      <Menu
        mode={collapsed ? 'vertical' : 'inline'}
        theme="dark"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={[selectedKey]}
      >
        {children}
      </Menu>
    </Sider>
  );
}

function BasicHeader() {
  const collapsed = useCollapsed();

  function toggleCollapsed() {
    collapsed$.next(!collapsed);
  }

  function logout() {
    localStorage.removeItem('login');
    router.replace({
      name: 'gate',
    });
  }

  return (
    <Header className="header">
      {collapsed ? (
        <MenuUnfoldOutlined className="trigger" onClick={toggleCollapsed} />
      ) : (
        <MenuFoldOutlined className="trigger" onClick={toggleCollapsed} />
      )}
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
              退出登录
            </Menu.Item>
          </Menu>
        }
        placement="bottomCenter"
        className="profile"
      >
        <span>
          <Avatar size="small" icon={<img src={avatar} />} className="avatar" />
          <span>管理员</span>
        </span>
      </Dropdown>
    </Header>
  );
}

function ContentHeader() {
  const { breadcrumb, title } = useBreadcrumb();

  return (
    title && (
      <PageHeader
        className="page-header"
        title={title}
        breadcrumbRender={() => (
          <Breadcrumb>
            {breadcrumb.map(({ title, name, path, args }) => {
              if (name || path) {
                return (
                  <Breadcrumb.Item>
                    <Link name={name} path={path} args={args}>
                      {title}
                    </Link>
                  </Breadcrumb.Item>
                );
              }

              return <Breadcrumb.Item>{title}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
        )}
      ></PageHeader>
    )
  );
}

export default function Basic({ children }: { children: React.ReactNode }) {
  const { loading } = useRouter();

  return (
    <Layout id="basic">
      <BasicMenu />
      <Layout>
        <BasicHeader />
        <Content className="content">
          {loading ? (
            <div className="loading">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <ContentHeader />
              <Card>{children}</Card>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
