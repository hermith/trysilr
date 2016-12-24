import React, { PropTypes } from 'react';
import Section from './section';
import { PersonProp } from '../objectDefinitions';

const Rooms = ({ rooms }) => {
  const allRooms = [];
  rooms.forEach((room) => {
    allRooms.push(<Section key={room[0].rom.navn} room={room} />);
  });
  return <div>{allRooms}</div>;
};

Rooms.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.arrayOf(PersonProp)),
};

export default Rooms;
