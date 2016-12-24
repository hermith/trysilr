import { PropTypes } from 'react';

export const RoomInfoProp = PropTypes.shape({
  navn: PropTypes.string.isRequired,
  lokasjon: PropTypes.string.isRequired,
});

export const PersonProp = PropTypes.shape({
  fornavn: PropTypes.string.isRequired,
  etternavn: PropTypes.string.isRequired,
  aktivitetsdeltagelse: PropTypes.string.isRequired,
});
