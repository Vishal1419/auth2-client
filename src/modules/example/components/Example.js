import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';
import Menu from './Menu/MenuContainer';
import Products from './Products/ProductsContainer';
import GoogleLoader from '../../../shared/components/GoogleLoader';

const Example = ({ loading }) => (
  <BlockUI
    tag="div"
    blocking={loading}
    loader={<GoogleLoader height={50} width={50} />}
    className="full-height"
    keepInView
  >
    <div className="example">
      <Menu />
      <Products />
    </div>
  </BlockUI>
);

Example.propTypes = {
  loading: PropTypes.bool,
};

Example.defaultProps = {
  loading: false,
};

export default Example;
