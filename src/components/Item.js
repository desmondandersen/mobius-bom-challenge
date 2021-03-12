// Import React
import React, { Component } from 'react';

// Import bootstrap components
import Button from 'react-bootstrap/Button';

// Item component
class Item extends Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      this.props.handleRemovePart(this.props.id);
    };
  }
  formatPrice(cost) {
    const dollars = cost / 100 > 0 ? Math.floor(cost / 100) : 0;
    const cents = cost % 100;
    return '$' + dollars + '.' + (cents < 10 ? '0' : '') + cents;
  }

  render() {
    return (
      <>
        <div className='item'>
          <strong>Part #{this.props.part}</strong> <br />
          Quantity: {this.props.quantity}
          <br />
          Unit Price: {this.formatPrice(this.props.cost)}
        </div>
        <Button onClick={this.handleClick} size='sm' variant='outline-dark'>
          Remove
        </Button>
      </>
    );
  }
}

export default Item;
