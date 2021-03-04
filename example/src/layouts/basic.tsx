import React, { useEffect, useState } from 'react';
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
  ClockCircleOutlined,
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
    icon: <ClockCircleOutlined />,
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
  const { name, path } = useRouter();
  const route = name || path;

  const [keys, setKeys] = useState({
    openKeys: [] as string[],
    selectedKeys: [] as string[],
  });

  useEffect(
    function () {
      function getKeys(
        items: MenuItem[],
      ): {
        openKeys: string[];
        selectedKeys: string[];
      } {
        for (let { title, name, path, children } of items) {
          const itemRoute = name || path;
          if (itemRoute == route) {
            return {
              openKeys: keys.openKeys,
              selectedKeys: [title],
            };
          }

          if (children) {
            const { openKeys, selectedKeys } = getKeys(children);
            if (selectedKeys.length) {
              if (openKeys.indexOf(title) == -1) {
                openKeys.push(title);
              }
              return {
                openKeys,
                selectedKeys,
              };
            }
          }
        }

        return {
          openKeys: keys.openKeys,
          selectedKeys: [],
        };
      }
      setKeys(getKeys(items));
    },
    [route],
  );

  function select({ selectedKeys }: any) {
    if (selectedKeys) {
      setKeys({
        ...keys,
        selectedKeys,
      });
    }
  }
  function open(openKeys: any) {
    setKeys({
      ...keys,
      openKeys,
    });
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
  const children = renderItems(items);

  const collapsed = useCollapsed();

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
        {...keys}
        onSelect={select}
        onOpenChange={open}
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
    breadcrumb.length > 1 && (
      <PageHeader
        className="page-header"
        breadcrumbRender={() => (
          <Breadcrumb>
            {breadcrumb.map(({ title, name, path, args }) => {
              if (name || path) {
                return (
                  <Breadcrumb.Item key={title}>
                    <Link name={name} path={path} args={args}>
                      {title}
                    </Link>
                  </Breadcrumb.Item>
                );
              }

              return <Breadcrumb.Item key={title}>{title}</Breadcrumb.Item>;
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
              {children}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
