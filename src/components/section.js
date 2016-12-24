import React, { PropTypes } from 'react';
import { Panel, Col } from 'react-bootstrap';
import Person from './person';
import { RoomInfoProp, PersonProp } from '../objectDefinitions';

const Subheading = ({ roomInfo }) => <span>{roomInfo.navn} ({roomInfo.lokasjon})</span>;

Subheading.propTypes = {
  roomInfo: RoomInfoProp,
};

const Section = ({ room }) => {
  const people = [];
  room.forEach((person) => {
    people.push(<Person key={person.fornavn + person.etternavn} person={person} />);
  });

  return (
    <Col xs={6} md={3}>
      <Panel header={<Subheading roomInfo={room[0].rom} />}>
        {people}
      </Panel>
    </Col>
  );
};

Section.propTypes = {
  room: PropTypes.arrayOf(PersonProp),
};

export default Section;
