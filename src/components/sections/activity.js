import React, { PropTypes } from 'react';
import { Row, Alert } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
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

const Activity = ({ data, search }) => {
  const searchValue = search.toLowerCase();
  const byActivity = _.values(_.groupBy(data, 'aktivitetsdeltagelse'));
  let searchWarning;

  if (searchValue) {
    if (!filterToStart(byActivity, searchValue)) {
      searchWarning = (
        <Row className="warningHolder">
          <Alert bsStyle="warning">Fant ingen med navn {search}</Alert>
        </Row>
      );
    }
  }

  const activities = [];
  byActivity.forEach((activity) => {
    activities.push(
      <Section
        key={activity[0].aktivitetsdeltagelse} room={activity}
        header={<Subheading activity={activity[0].aktivitetsdeltagelse} />}
        search={searchValue}
      />,
    );
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
        {activities}
      </Masonry>
    </div>
  );
};

Activity.propTypes = {
  data: PropTypes.arrayOf(PersonProp),
  search: PropTypes.string,
};

export default Activity;
