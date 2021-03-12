// Import React and libraries
import React, { Component } from 'react';
import API from '../api';

// Import bootstrap components
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

// Import components
import Item from './Item';

// Bill of Materials (BOM) component
class BOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bomItems: [],
    };
    this.handleClick = () => {
      this.props.handleAddPart(this.props.id);
    };
  }

  // Get list of BOM items from API
  componentDidMount() {
    API.get(`bom/${this.props.id}/bomitem`).then((res) => {
      const bomItems = res.data;
      this.setState({ bomItems });
    });
  }

  render() {
    return (
      <Card bg='light' className='bom-card'>
        <Card.Header>BOM {this.props.id}</Card.Header>
        <ListGroup variant='flush'>
          {this.state.bomItems.map((item, key) => (
            <ListGroup.Item key={key}>
              <Item
                part={item.specific_part}
                quantity={item.quantity}
                cost={item.item_unit_cost}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Body>
          <Button onClick={this.handleClick} variant='primary'>
            Add New Part
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default BOM;
