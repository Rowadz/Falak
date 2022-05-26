import styled from '@emotion/styled';
import { Navbar, Nav, Badge } from 'rsuite';
import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs';
import {
  isConnectedSelector,
  useStore,
  setThemeSelector,
  themeSelector,
  FalakTheme,
} from '../store';

const CustomNavBar = styled(Navbar)`
  box-shadow: 0px -1px 13px 0px #111;
`;

export const AppNavBar = () => {
  const isConnected = useStore(isConnectedSelector);
  const setTheme = useStore(setThemeSelector);
  const theme: FalakTheme = useStore(themeSelector);

  return (
    <CustomNavBar>
      <Navbar.Brand>
        <span role="img" aria-label="moon">
          🌑
        </span>
        Falak
        <span role="img" aria-label="moon">
          🌑
        </span>
      </Navbar.Brand>
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
          {theme === 'light' && <BsLightbulb color="black" />}
          {theme === 'dark' && <BsLightbulbOff color="white" />}
        </Nav.Item>
      </Nav>
    </CustomNavBar>
  );
};
