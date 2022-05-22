import styled from '@emotion/styled';
import { Navbar } from 'rsuite';

const CustomNavBar = styled(Navbar)`
  box-shadow: 0px -1px 13px 0px #111;
`;

export const AppNavBar = () => {
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
    </CustomNavBar>
  );
};
