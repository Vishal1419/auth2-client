import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import GoogleLoader from '../../../../shared/components/GoogleLoader';

const Products = ({ loading, products }) => (
  <div className="products">
    <BlockUI
      tag="div"
      blocking={loading}
      loader={<GoogleLoader height={50} width={50} />}
      className="full-height"
      keepInView
    >
      {
        products && products.length > 0
          ? (
            <Fragment>
              <h1>Products:</h1>
              <Table className="products-table">
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {products.map(product => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div className="name">{product.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="price">{product.price}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Fragment>
          )
          : 'You don\'t have any products.'
      }
    </BlockUI>
  </div>
);

Products.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.instanceOf(Array),
};

Products.defaultProps = {
  loading: false,
  products: [],
};

export default Products;
