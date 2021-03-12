// Import React
import React, { Component } from 'react';

// Item component
class Item extends Component {
  formatPrice(cost) {
    const dollars = cost / 100 > 0 ? Math.floor(cost / 100) : 0;
    const cents = cost % 100;
    return '$' + dollars + '.' + (cents < 10 ? '0' : '') + cents;
  }

  render() {
    return (
      <div>
        <strong>Part #{this.props.part}</strong>
        <br />
        Quantity: {this.props.quantity}
        <br />
        Unit Price: {this.formatPrice(this.props.cost)}
      </div>
    );
  }
}

export default Item;
