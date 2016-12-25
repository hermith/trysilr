import React, { PropTypes } from 'react';
import { FormControl, FormGroup, Button, Navbar, Glyphicon, ButtonGroup } from 'react-bootstrap';

const Header = ({ onClicks, onSearch, state: { activeButton } }) => (
  <Navbar className="header">
    <Navbar.Header>
      <Navbar.Brand>
        <a>Trysilr</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl
            onSelect={e => onSearch('search', e.currentTarget.value)}
            type="text" placeholder="Hvem er du?" className="searchWhois"
          />
          {' '}
          <ButtonGroup>
            <Button active={activeButton === 0} onClick={() => onClicks(0)}>
              <Glyphicon glyph="home" /> Romfordeling
            </Button>
            <Button active={activeButton === 1} onClick={() => onClicks(1)}>
              <Glyphicon glyph="road" /> Busstur
            </Button>
            <Button active={activeButton === 2} onClick={() => onClicks(2)}>
              <Glyphicon glyph="thumbs-up" /> Aktivitet
            </Button>
          </ButtonGroup>
        </FormGroup>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  onClicks: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    activeButton: PropTypes.number.isRequired,
  }).isRequired,
};

export default Header;
