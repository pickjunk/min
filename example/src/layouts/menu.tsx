import react, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { router, useRouter } from '@pickjunk/min';
import Icon from '../assets/icon';

interface MenuItem {
  icon?: react.ReactElement;
  label: string;
  name?: string;
  children?: MenuItem[];
}

const data: MenuItem[] = [
  {
    icon: <Icon type="icon-h" />,
    label: 'H5',
    name: 'apps',
  },
  {
    icon: <Icon type="icon-xiaochengxu" />,
    label: '小程序',
    name: 'apps',
  },
];

function _Menu({ data }: { data: MenuItem[] }) {
  const [menu, setMenu] = useState(data);
  const { location } = useRouter();

  useEffect(
    function () {
      function traverse(tree) {
        return tree.map(function (node) {
          const newNode = { ...node };
          let { name, path, args, children } = newNode;

          let active = false;
          if (name || path) {
            active = location === router.link(name || path, args);
          }
          if (children) {
            children = traverse(children);
            for (const child of children) {
              if (child.active) {
                active = true;
              }
            }
            newNode.children = children;
          }
          newNode.active = active;

          return newNode;
        });
      }

      setMenu(traverse(data));
    },
    [data, location],
  );

  return <_SubMenu data={menu} />;
}

function _SubMenu({ data, level = 1 }) {
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(
    function () {
      for (let i in data) {
        if (data[i].active) {
          setOpenIndex(Number(i));
        }
      }
    },
    [data],
  );

  return (
    <Menu.SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
      {data.map(({ icon, label, path, name, args, children, active }, i) => {
        if (children && children.length > 0) {
          const open = i === openIndex;

          return (
            <Fragment key={label}>
              <ListItem
                className={clsx(classes.item, {
                  [classes.opened]: open,
                })}
                style={itemStyle}
                onClick={function () {
                  if (open) {
                    setOpenIndex(-1);
                  } else {
                    setOpenIndex(i);
                  }
                }}
              >
                {icon && (
                  <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                )}
                <ListItemText
                  classes={{ primary: classes.text }}
                  primary={label}
                />
                {open ? (
                  <ExpandLess key="less" className={classes.arrow} />
                ) : (
                  <ExpandMore key="more" className={classes.arrow} />
                )}
              </ListItem>
              <Collapse className={classes.collapse} in={open}>
                <SubMenu data={children} level={level + 1} />
              </Collapse>
            </Fragment>
          );
        }

        return (
          <Link to={name || path} args={args} key={label}>
            <ListItem
              className={clsx(classes.item, {
                [classes.active]: active,
              })}
              style={itemStyle}
            >
              {icon && (
                <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
              )}
              <ListItemText
                classes={{ primary: classes.text }}
                primary={label}
              />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ width: 256 }}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={this.state.collapsed}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
}
