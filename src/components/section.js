import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Panel, Col } from 'react-bootstrap';
import Person from './common/person';
import { PersonProp } from '../objectDefinitions';
import { findAndPutFirst } from '../other/filtering';

const Section = ({ room, header, search }) => {
  const sortedRoom = _.sortBy(room, ['fornavn', 'etternavn']);
  if (search && room.active) {
    findAndPutFirst(sortedRoom, search);
  }
  const people = [];
  sortedRoom.forEach((person) => {
    people.push(<Person key={person.fornavn + person.etternavn} person={person} />);
  });

  return (
    <Col xs={6} sm={4} md={3} lg={2}>
      <Panel bsStyle={room.active ? 'primary' : 'default'} header={header}>
        {people}
      </Panel>
    </Col>
  );
};

Section.propTypes = {
  room: PropTypes.arrayOf(PersonProp),
  header: PropTypes.node,
  search: PropTypes.string,
};

export default Section;
