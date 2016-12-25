import React, { PropTypes } from 'react';
import { Col, Alert } from 'react-bootstrap';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Section from '../section';
import { PersonProp } from '../../objectDefinitions';
import filterToStart from '../../other/filtering';

const Subheading = ({ activity }) => {
  const toActivityText = (activityValue) => {
    switch (activityValue) {
      case 'KANSKJE':
        return 'Blir kanskje med';
      case 'JA':
        return 'Blir med! 🎉';
      case 'NEI':
        return 'Blir ikke med';
      default:
        return activityValue;
    }
  };

  return <span>{toActivityText(activity)}</span>;
};

Subheading.propTypes = {
  activity: PropTypes.string.isRequired,
};

const BusTravel = ({ data, search }) => {
  const searchValue = search.toLowerCase();
  const byActivity = _.values(_.groupBy(data, 'aktivitetsdeltagelse'));
  let searchWarning;

  if (searchValue) {
    if (!filterToStart(byActivity, searchValue)) {
      searchWarning = <Col xs={12}> <Alert bsStyle="warning">Fant ingen med navn {search}</Alert></Col>;
    }
  }

  const activities = [];
  byActivity.forEach((bus) => {
    activities.push(
      <Section
        key={bus[0].aktivitetsdeltagelse} room={bus}
        header={<Subheading activity={bus[0].aktivitetsdeltagelse} />}
      />,
    );
  });

  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={100}
    >
      {searchWarning}
      {activities}
    </ReactCSSTransitionGroup>
  );
};

BusTravel.propTypes = {
  data: PropTypes.arrayOf(PersonProp),
  search: PropTypes.string,
};

export default BusTravel;
