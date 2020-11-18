import React from 'react';

import SideMenu from 'components/SideMenu';
import Container from 'components/Container';

const Layout: React.FC<any> = ({ children }) => (
  <><SideMenu />
    <div className='flex'>
    <Container>
      {children}
    </Container>
  </div>
  </>
);

export default Layout;
