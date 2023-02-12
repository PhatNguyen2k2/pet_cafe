import React, { Component } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import CardItem from './cardItem';

const ListDrink = () => {
  return (
    <Container>
      <Row>
        <Col>
          <ButtonGroup vertical>
            <Button>Button</Button>
            <Button>Button</Button>
            <DropdownButton
              as={ButtonGroup}
              title="Dropdown"
              id="bg-vertical-dropdown-1"
            >
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>

            <Button>Button</Button>
            <Button>Button</Button>

            <DropdownButton
              as={ButtonGroup}
              title="Dropdown"
              id="bg-vertical-dropdown-2"
            >
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              as={ButtonGroup}
              title="Dropdown"
              id="bg-vertical-dropdown-3"
            >
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
export default ListDrink;
