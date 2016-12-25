import React, { PropTypes } from 'react';
import { Panel, Col } from 'react-bootstrap';
import Person from './common/person';
import { PersonProp } from '../objectDefinitions';

const Section = ({ room, header }) => {
  const people = [];
  room.forEach((person) => {
    people.push(<Person key={person.fornavn + person.etternavn} person={person} />);
  });

  return (
    <Col xs={6} md={3}>
      <Panel bsStyle={room.active ? 'primary' : 'default'} header={header}>
        {people}
      </Panel>
    </Col>
  );
};

Section.propTypes = {
  room: PropTypes.arrayOf(PersonProp),
  header: PropTypes.node,
};

export default Section;
