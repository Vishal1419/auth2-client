import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';

import Menu from './Menu';
import { OAUTH_SERVER_LOGIN_URL } from '../../../../config';
import { showNotification } from '../../../../shared/components/Notifications';
import * as actions from '../../redux/actions';
import { noop, displayErrors } from '../../../../utils';
import { usePrevious } from '../../../../utils/hooks';
import RequestStates from '../../../../utils/request-states';

const MenuContainer = ({
  location, exchangeToken, getProducts, flushProducts, hasError, errorMessages,
}) => {
  useEffect(() => {
    const parsedQueryString = qs.parse(location.search);
    if (parsedQueryString.code) {
      localStorage.setItem('code', parsedQueryString.code);
      window.close();
    } else if (parsedQueryString.error) {
      localStorage.setItem('error', parsedQueryString.error);
      window.close();
    }
  }, []);

  const prevErrorMessages = usePrevious(errorMessages);
  useEffect(() => {
    if (hasError) {
      displayErrors(prevErrorMessages, errorMessages);
    }
  }, [hasError, errorMessages]);

  const onOAuthLoginClick = () => {
    const oauthDialogLeft = (window.innerWidth / 2) - 300;
    const oauthDialogTop = (window.innerHeight / 2) - 175;

    const popup = window.open(
      OAUTH_SERVER_LOGIN_URL,
      '_blank',
      `height=350,width=600,left=${oauthDialogLeft},top=${oauthDialogTop}`,
      true,
    );

    const loop = setInterval(() => {
      if (popup.closed) {
        clearInterval(loop);
        const authorizationCode = localStorage.getItem('code');
        if (authorizationCode) {
          localStorage.removeItem('code');
          const currentUri = window.location.origin;
          exchangeToken(authorizationCode, currentUri).then(() => {
            showNotification('Logged in', 'success', 5000);
          });
        } else {
          const error = localStorage.getItem('error');
          if (error) {
            localStorage.removeItem('error');
            showNotification(error, 'error', 5000);
          }
        }
      }
    }, 1000);
  };

  const onLogoutClick = () => {
    localStorage.removeItem('access_token');
    flushProducts();
    showNotification('Logged out', 'success', 5000);
  };

  const onGetProductsClick = () => {
    getProducts();
  };

  return (
    <Menu
      onOAuthLoginClick={onOAuthLoginClick}
      onLogoutClick={onLogoutClick}
      onGetProductsClick={onGetProductsClick}
      isLoggedIn={!!localStorage.getItem('access_token')}
    />
  );
};

MenuContainer.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  exchangeToken: PropTypes.func,
  getProducts: PropTypes.func,
  flushProducts: PropTypes.func,
  hasError: PropTypes.bool,
  errorMessages: PropTypes.instanceOf(Array),
};

MenuContainer.defaultProps = {
  exchangeToken: noop,
  getProducts: noop,
  flushProducts: noop,
  hasError: false,
  errorMessages: [],
};

const mapStateToProps = state => ({
  hasError: state.example.exchangeTokenRequestState === RequestStates.error,
  errorMessages: [
    state.example.exchangeTokenError,
  ],
});

const mapDispatchToProps = dispatch => ({
  exchangeToken: (code, redirectUri) => dispatch(actions.exchangeToken(code, redirectUri)),
  getProducts: () => dispatch(actions.getProducts()),
  flushProducts: () => dispatch(actions.flushProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuContainer));
