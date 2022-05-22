import styled from '@emotion/styled';
import { Navbar, Nav, Badge } from 'rsuite';
import { isConnectedSelector, useStore } from '../store';

const CustomNavBar = styled(Navbar)`
  box-shadow: 0px -1px 13px 0px #111;
`;

export const AppNavBar = () => {
  const isConnected = useStore(isConnectedSelector);

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
      </Nav>
    </CustomNavBar>
  );
};
