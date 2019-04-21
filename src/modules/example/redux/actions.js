import * as actionTypes from './actionTypes';
import api from '../../../utils/api';
import { CLIENT_ID, CLIENT_SECRET } from '../../../config';

export const exchangeToken = (code, redirectUri) => ({
  type: actionTypes.EXCHANGE_TOKEN,
  payload: api.post('/oauth2/token', {
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  }, {
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET,
    },
  }),
});

export const flushProducts = () => ({
  type: actionTypes.FLUSH_PRODUCTS,
});

export const getProducts = () => ({
  type: actionTypes.GET_PRODUCTS,
  payload: api.get('/products'),
});
