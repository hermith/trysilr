import React, { Component } from 'react';
import _ from 'lodash';
import people from '../paameldinger.json';
import Rooms from './rooms';
import Search from './header/header';

const byRoom = _.values(_.groupBy(people, 'rom.navn'));
const byBus = _.values(_.groupBy(people, 'transport'));
const byActivity = _.values(_.groupBy(people, 'aktivitetsdeltagelse'));

class Trysilr extends Component {
  constructor() {
    super();
    this.state = {
      activeButton: 0,
    };

    this.headerButtonsClicked = this.headerButtonsClicked.bind(this);
  }

  headerButtonsClicked(id) {
    this.setState(old => ({
      ...old,
      activeButton: id,
    }));
  }

  render() {
    const selection = () => {
      switch (this.state.activeButton) {
        case 0:
          return byRoom;
        case 1:
          return byBus;
        case 2:
          return byActivity;
        default:
          return [];
      }
    };
    return (
      <div>
        <Search state={this.state} onClicks={this.headerButtonsClicked} />
        <Rooms rooms={selection()} />
      </div>
    );
  }
}

export default Trysilr;
