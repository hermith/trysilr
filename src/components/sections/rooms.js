import React, { PropTypes } from 'react';
import { Col, Alert } from 'react-bootstrap';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Section from '../section';
import { PersonProp, RoomInfoProp } from '../../objectDefinitions';
import filterToStart from '../../other/filtering';

const Subheading = ({ roomInfo }) => <span>{roomInfo.navn} ({roomInfo.lokasjon})</span>;

Subheading.propTypes = {
  roomInfo: RoomInfoProp,
};

const Rooms = ({ data, search }) => {
  const searchValue = search.toLowerCase();
  const byRoom = _.values(_.groupBy(data, 'rom.navn'));
  let searchWarning;

  if (searchValue) {
    if (!filterToStart(byRoom, searchValue)) {
      searchWarning = <Col xs={12}> <Alert bsStyle="warning">Fant ingen med navn {search}</Alert></Col>;
    }
  }

  const allRooms = [];
  byRoom.forEach((room) => {
    allRooms.push(<Section key={room[0].rom.navn} room={room} header={<Subheading roomInfo={room[0].rom} />} />);
  });

  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={100}
    >
      {searchWarning}
      {allRooms}
    </ReactCSSTransitionGroup>
  );
};

Rooms.propTypes = {
  data: PropTypes.arrayOf(PersonProp),
  search: PropTypes.string,
};

export default Rooms;
