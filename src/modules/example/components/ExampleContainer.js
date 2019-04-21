import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Example from './Example';
import RequestStates from '../../../utils/request-states';

const ExampleContainer = ({ loading }) => (
  <Example loading={loading} />
);

ExampleContainer.propTypes = {
  loading: PropTypes.bool,
};

ExampleContainer.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  loading: state.example.exchangeTokenRequestState === RequestStates.loading,
});

export default connect(mapStateToProps)(ExampleContainer);
