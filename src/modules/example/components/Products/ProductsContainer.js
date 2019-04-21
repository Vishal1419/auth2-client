import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Products from './Products';
import { displayErrors } from '../../../../utils';
import { usePrevious } from '../../../../utils/hooks';
import RequestStates from '../../../../utils/request-states';

const ProductsContainer = ({
  products, loading, hasError, errorMessages,
}) => {
  const prevErrorMessages = usePrevious(errorMessages);
  useEffect(() => {
    if (hasError) {
      displayErrors(prevErrorMessages, errorMessages);
    }
  }, [hasError, errorMessages]);

  return (
    <Products
      loading={loading}
      products={products}
    />
  );
};

ProductsContainer.propTypes = {
  products: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessages: PropTypes.instanceOf(Array),
};

ProductsContainer.defaultProps = {
  products: [],
  loading: false,
  hasError: false,
  errorMessages: [],
};

const mapStateToProps = state => ({
  products: state.example.products,
  loading: state.example.getProductsRequestState === RequestStates.loading,
  hasError: state.example.getProductsRequestState === RequestStates.error,
  errorMessages: [
    state.example.getProductsError,
  ],
});

export default connect(mapStateToProps)(ProductsContainer);
