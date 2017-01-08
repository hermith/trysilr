import React, { PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import { Row, Alert } from 'react-bootstrap';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Section from '../section';
import { PersonProp, RoomInfoProp } from '../../objectDefinitions';
import { sortAndHighlightUser as filterToStart } from '../../other/filtering';

const Subheading = ({ roomInfo }) => <span>{roomInfo.navn} ({roomInfo.lokasjon})</span>;

Subheading.propTypes = {
  roomInfo: RoomInfoProp,
};

const Rooms = ({ data, search }) => {
  const searchValue = search.toLowerCase();
  const byRoom = _.values(_.groupBy(data, 'rom.identifikasjon'));
  let searchWarning;

  if (searchValue) {
    if (!filterToStart(byRoom, searchValue)) {
      searchWarning = (
        <Row className="warningHolder">
          <Alert bsStyle="warning">Fant ingen med navn {search}</Alert>
        </Row>
      );
    }
  }

  const allRooms = [];
  byRoom.forEach((roomGroup) => {
    allRooms.push(<Section
      key={roomGroup[0].rom.identifikasjon} room={roomGroup}
      header={<Subheading roomInfo={roomGroup[0].rom} />}
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
        {allRooms}
      </Masonry>
    </div>
  );
};

Rooms.propTypes = {
  data: PropTypes.arrayOf(PersonProp),
  search: PropTypes.string,
};

export default Rooms;
