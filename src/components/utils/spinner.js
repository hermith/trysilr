import React from 'react';
import Loading from 'react-loading';
import { Col } from 'react-bootstrap';

export default props => (
  <Col xs={12}>
    <div className="centerBlock"><Loading type="cylon" color="#ffffff" {...props} /></div>
  </Col>
);
