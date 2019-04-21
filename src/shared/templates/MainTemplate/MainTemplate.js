import React from 'react';
import PropTypes from 'prop-types';

import AppHeader from '../../components/AppHeader';

const MainTemplate = ({ children }) => (
  <div className="main-template">
    <AppHeader />
    <main>
      {children}
    </main>
  </div>
);

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

MainTemplate.defaultProps = {
  children: <div />,
};

export default MainTemplate;
