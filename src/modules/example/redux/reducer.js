import * as actionTypes from './actionTypes';
import RequestStates from '../../../utils/request-states';

const INITIAL_STATE = {
  exchangeTokenRequestState: RequestStates.init,
  exchangeTokenError: null,
  products: [],
  getProductsRequestState: RequestStates.init,
  getProductsError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.EXCHANGE_TOKEN_LOADING:
      return {
        exchangeTokenRequestState: RequestStates.loading,
        exchangeTokenError: null,
      };
    case actionTypes.EXCHANGE_TOKEN_SUCCESS:
      localStorage.setItem('access_token', (action.payload.data.access_token && action.payload.data.access_token.value) || '');
      return {
        exchangeTokenRequestState: RequestStates.success,
        exchangeTokenError: null,
      };
    case actionTypes.EXCHANGE_TOKEN_ERROR:
      return {
        exchangeTokenRequestState: RequestStates.error,
        exchangeTokenError: action.payload.error,
      };
    case actionTypes.FLUSH_PRODUCTS:
      return {
        ...state,
        products: [],
      };
    case actionTypes.GET_PRODUCTS_LOADING:
      return {
        ...state,
        getProductsRequestState: RequestStates.loading,
        getProductsError: null,
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
        getProductsRequestState: RequestStates.success,
        getProductsError: null,
      };
    case actionTypes.GET_PRODUCTS_ERROR:
      return {
        ...state,
        getProductsRequestState: RequestStates.error,
        getProductsError: (action.payload && action.payload.response && action.payload.response.data) || 'Unknown error',
      };
    default:
      return state;
  }
};
