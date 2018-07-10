import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCurrentLocation } from '../actions/index';

const Footer = () => (
  <div id='footer'>
    &#123; made with love <Link to={'/octothots'} onClick={() => this.props.dispatch(setCurrentLocation('/octothots'))} >4 octothorpes</Link> &#125;
  </div>
);

export default connect()(Footer);