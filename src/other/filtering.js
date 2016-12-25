import _ from 'lodash';

/* eslint no-param-reassign: 0 */
export default (array, search) => {
  let hasSorted = false;
  const removed = _.remove(array, (room) => {
    for (let i = 0; i < room.length; i += 1) {
      if (`${room[i].fornavn} ${room[i].etternavn}`.toLowerCase().includes(search)) {
        room.active = true;
        hasSorted = true;
        return true;
      }
    }
    room.active = false;
    return false;
  });

  array.unshift(...removed);
  return hasSorted;
};

export const findAndPutFirst = (array, name) => {
  const removed = _.remove(array, person => `${person.fornavn} ${person.etternavn}`.toLowerCase().includes(name));
  array.unshift(...removed);
  return !!removed;
};
