import React from 'react';
import { PersonProp } from '../../objectDefinitions';

const Person = ({ person }) => (
  <div className={person.active}>
    {`${person.fornavn} ${person.etternavn}`}
  </div>
);

Person.propTypes = {
  person: PersonProp,
};

export default Person;
