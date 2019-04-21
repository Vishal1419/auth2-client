import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { noop } from '../../../../utils';

const Menu = ({
  onOAuthLoginClick,
  onLogoutClick,
  onGetProductsClick,
  isLoggedIn,
}) => (
  <div className="menu">
    <Button
      color="primary"
      variant="contained"
      disabled={isLoggedIn}
      onClick={onOAuthLoginClick}
    >
      Login with oAuth2 Server
    </Button>
    <Button
      color="primary"
      variant="contained"
      onClick={onLogoutClick}
      disabled={!isLoggedIn}
    >
      Logout
    </Button>
    <Button color="primary" variant="contained" onClick={onGetProductsClick}>
      Get Products
    </Button>
  </div>
);

Menu.propTypes = {
  onOAuthLoginClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  onGetProductsClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

Menu.defaultProps = {
  onOAuthLoginClick: noop,
  onLogoutClick: noop,
  onGetProductsClick: noop,
  isLoggedIn: false,
};

export default Menu;
