import React, { Component } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Item from './Item';

// Product BOM
class BOM extends Component {
  state = { bomItems: [] };

  // Get list of BOM items from API
  componentDidMount() {
    const url =
      'https://5f996efe50d84900163b8a42.mockapi.io/api/v1/bom/' +
      this.props.id +
      '/bomitem';

    axios.get(url).then((res) => {
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
            <ListGroup.Item>
              <Item
                part={item.specific_part}
                quantity={item.quantity}
                cost={item.item_unit_cost}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    );
  }
}

export default BOM;
