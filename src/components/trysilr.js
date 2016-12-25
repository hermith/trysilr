import React, { Component } from 'react';
import 'whatwg-fetch';
import { debounce } from 'throttle-debounce';
import { Col, Alert } from 'react-bootstrap';
import Rooms from './sections/rooms';
import Bus from './sections/busTravel';
import Activity from './sections/activity';
import Header from './header/header';
import Spinner from './utils/spinner';

class Trysilr extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      data: {},
      activeButton: 0,
      search: '',
    };

    this.headerButtonsClicked = this.headerButtonsClicked.bind(this);
    this.updateState = this.updateState.bind(this);
    this.debouncedUpdateState = debounce(200, this.updateState);

    fetch('/trysilr/paameldinger.json')
    .then(response => response.json())
    .then((json) => {
      this.updateState('data', json);
      this.updateState('loading', false);
    }).catch(() => {
      this.updateState('error', true);
    });
  }

  updateState(key, value) {
    this.setState(old => ({
      ...old,
      [key]: value,
    }));
  }

  headerButtonsClicked(id) {
    this.setState(old => ({
      ...old,
      activeButton: id,
    }));
  }

  render() {
    let innhold;
    if (this.state.error) {
      innhold = <Col xs={12}> <Alert bsStyle="danger">Feil! Klarte ikke å laste data.</Alert></Col>;
    } else if (this.state.loading) {
      innhold = <Spinner />;
    } else {
      switch (this.state.activeButton) {
        case 0:
          innhold = <Rooms data={this.state.data} search={this.state.search} />;
          break;
        case 1:
          innhold = <Bus data={this.state.data} search={this.state.search} />;
          break;
        case 2:
          innhold = <Activity data={this.state.data} search={this.state.search} />;
          break;
        default:
          innhold = <Col xs={12}> <Alert bsStyle="danger">Feil! Har du bomma på knappen?</Alert></Col>;
      }
    }

    return (
      <div>
        <Header state={this.state} onClicks={this.headerButtonsClicked} onSearch={this.debouncedUpdateState} />
        {innhold}
      </div>
    );
  }
}

export default Trysilr;
