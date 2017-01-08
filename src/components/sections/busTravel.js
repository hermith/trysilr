import React, { PropTypes } from 'react';
import { Row, Alert } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Section from '../section';
import { PersonProp } from '../../objectDefinitions';
import { sortAndHighlightUser as filterToStart } from '../../other/filtering';

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
      searchWarning = (
        <Row className="warningHolder">
          <Alert bsStyle="warning">Fant ingen med navn {search}</Alert>
        </Row>
      );
    }
  }

  const busses = [];
  byBus.forEach((bus) => {
    busses.push(<Section
      key={bus[0].transport} room={bus}
      header={<Subheading bus={bus[0].transport} />}
      search={searchValue}
    />);
  });

  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={100}
      >
        {searchWarning}
      </ReactCSSTransitionGroup>
      <Masonry>
        {busses}
      </Masonry>
    </div>
  );
};

BusTravel.propTypes = {
  data: PropTypes.arrayOf(PersonProp),
  search: PropTypes.string,
};

export default BusTravel;
