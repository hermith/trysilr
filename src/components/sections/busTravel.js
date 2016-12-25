import React, { PropTypes } from 'react';
import { Col, Alert } from 'react-bootstrap';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Section from '../section';
import { PersonProp } from '../../objectDefinitions';
import filterToStart from '../../other/filtering';

const Subheading = ({ bus }) => {
  const toBusText = (busValue) => {
    switch (busValue) {
      case 'BUSS_TIDLIG':
        return 'Tidlig buss';
      case 'BUSS_SEN':
        return 'Sen buss';
      case 'BIL':
        return 'Kjører selv';
      default:
        return busValue;
    }
  };

  return <span>{toBusText(bus)}</span>;
};

Subheading.propTypes = {
  bus: PropTypes.string.isRequired,
};

const BusTravel = ({ data, search }) => {
  const searchValue = search.toLowerCase();
  const byBus = _.values(_.groupBy(data, 'transport'));
  let searchWarning;

  if (searchValue) {
    if (!filterToStart(byBus, searchValue)) {
      searchWarning = <Col xs={12}> <Alert bsStyle="warning">Fant ingen med navn {search}</Alert></Col>;
    }
  }

  const busses = [];
  byBus.forEach((bus) => {
    busses.push(<Section key={bus[0].transport} room={bus} header={<Subheading bus={bus[0].transport} />} />);
  });

  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={100}
    >
      {searchWarning}
      {busses}
    </ReactCSSTransitionGroup>
  );
};

BusTravel.propTypes = {
  data: PropTypes.arrayOf(PersonProp),
  search: PropTypes.string,
};

export default BusTravel;
