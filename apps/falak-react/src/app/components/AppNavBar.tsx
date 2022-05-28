import styled from '@emotion/styled';
import { cx } from '@emotion/css';

import { Navbar, Nav, Badge } from 'rsuite';
import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs';
import { REACT_ROUTES } from '@falak/constants';
import {
  isConnectedSelector,
  useStore,
  setThemeSelector,
  themeSelector,
  FalakTheme,
} from '../store';
import { Link, useLocation } from 'react-router-dom';

const CustomNavBar = styled(Navbar)`
  box-shadow: 0px -1px 13px 0px #111;
  background-color: ${(props) => (props.theme === 'dark' ? '#1a1d24' : '#350c40')};
  color: #fff;
  a {
    color: #fff;
  }
  .rs-navbar-item:hover {
    background-color: #a192a6;
  }
  a:hover,
  li:hover,
  .active {
    background-color: #a192a6;
  }
`;

export const AppNavBar = () => {
  const isConnected = useStore(isConnectedSelector);
  const setTheme = useStore(setThemeSelector);
  const theme: FalakTheme = useStore(themeSelector);
  const { pathname } = useLocation();

  return (
    <CustomNavBar theme={theme}>
      <Navbar.Brand>
        <span role="img" aria-label="moon">
          🌑
        </span>
        Falak
        <span role="img" aria-label="moon">
          🌑
        </span>
      </Navbar.Brand>
      <Nav>
        <Link to={REACT_ROUTES.HOME}>
          <Nav.Item as="span" className={cx({ active: pathname === REACT_ROUTES.HOME })}>
            Home
          </Nav.Item>
        </Link>
        <Link to={REACT_ROUTES.TABLE_MONITOR}>
          <Nav.Item as="span" className={cx({ active: pathname === REACT_ROUTES.TABLE_MONITOR })}>
            Table Monitor
          </Nav.Item>
        </Link>

        <Link to={REACT_ROUTES.ROW_TIMELINE}>
          <Nav.Item as="span" className={cx({ active: pathname === REACT_ROUTES.ROW_TIMELINE })}>
            Row Timeline
          </Nav.Item>
        </Link>
      </Nav>
      <Nav pullRight>
        <Nav.Item>
          <Badge
            color={isConnected ? 'violet' : 'red'}
            content={isConnected ? 'Websocket server Online' : 'Websocket Server Offline'}
          />
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}>
          {theme === 'light' && <BsLightbulb color={theme === 'light' ? '#F4F4F4' : '#fff'} />}
          {theme === 'dark' && <BsLightbulbOff color={theme === 'dark' ? '#fff' : '#F4F4F4'} />}
        </Nav.Item>
      </Nav>
    </CustomNavBar>
  );
};
