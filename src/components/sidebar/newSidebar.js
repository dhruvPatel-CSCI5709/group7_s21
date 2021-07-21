import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar'
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from 'react-icons/fa'
// import sidebarBg from "./assets/bg1.jpg";
import styles from './newSidebar.module.css'
import c from 'classnames/bind'
import { useHistory } from 'react-router-dom'

const cx = c.bind(styles)

const Aside = ({
  image,
  collapsed,
  rtl,
  toggled,
  handleToggleSidebar,
  loginStatus,
}) => {
  const intl = useIntl()
  const history = useHistory()
  const path = history.location.pathname.substr(1)
  const [currentPage, setCurrentPage] = useState(null)

  const isActive = (currentPage) => {
    return currentPage === path.toLowerCase()
  }

  const setPage = (pagename) => {
    history.push('/' + pagename)
    setCurrentPage(pagename)
  }

  // useEffect(() => {
  //   console.log(path);
  //   setPage(history.location.pathname.substr(1));
  // }, [history]);

  useEffect(() => {
    if (loginStatus) {
      setPage('dashboard')
    }
  }, [])

  useEffect(() => {
    history.listen((location, action) => {
      console.log("routing.........");
      setCurrentPage(location.pathname.substr(1));
    });
  }, [history]);

  return (
    <ProSidebar
      className={cx('side-bar')}
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint='md'
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div className={cx('header-title')}>
          {intl.formatMessage({ id: 'sidebarTitle' })}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape='circle'>
          <MenuItem
            icon={<FaTachometerAlt />}
            onClick={() => setPage('dashboard')}
            className={isActive('dashboard') ? 'active' : ''}
            suffix={
              <span className='badge red'>
                {intl.formatMessage({ id: 'new' })}
              </span>
            }
          >
            {intl.formatMessage({ id: 'dashboard' })}
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            onClick={() => setPage('notifications')}
            className={isActive('notifications') ? 'active' : ''}
          >
            {' '}
            {intl.formatMessage({ id: 'notifications' })}
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            onClick={() => setPage('profile')}
            className={isActive('profile') ? 'active' : ''}
          >
            {' '}
            {intl.formatMessage({ id: 'profile' })}
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            onClick={() => setPage('reports')}
            className={isActive('reports') ? 'active' : ''}
          >
            {' '}
            {intl.formatMessage({ id: 'reports' })}
          </MenuItem>
          <MenuItem
            onClick={() => setPage("income")}
            className={isActive("income") ? "active" : ""}
            icon={<FaGem />}
          >
            {" "}
            {intl.formatMessage({ id: "income" })}
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            onClick={() => setPage('expense')}
            className={isActive('expense') ? 'active' : ''}
          >
            {' '}
            {intl.formatMessage({ id: 'expense' })}
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            onClick={() => setPage('emicalculator')}
            className={isActive('emicalculator') ? 'active' : ''}
          >
            {' '}
            {intl.formatMessage({ id: 'emiCalculator' })}
          </MenuItem>
          <MenuItem
            onClick={() => setPage('logout')}
            className={isActive('logout') ? 'active' : ''}
            icon={<FaGem />}
          >
            {' '}
            {intl.formatMessage({ id: 'logout' })}
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className='sidebar-btn-wrapper'
          style={{
            padding: '20px 24px',
          }}
        >
          Copyright@2021 FinCare
        </div>
      </SidebarFooter>
    </ProSidebar>
  )
}

export default Aside
