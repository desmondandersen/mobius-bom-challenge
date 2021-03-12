// Import React and libraries
import React, { Component } from 'react';
import API from '../api';

// Import bootstrap components
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// Import components
import Item from './Item';

// Bill of Materials (BOM) component
class BOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bomItems: [],
      showModal: false,
      partNumber: '',
      cost: '',
      quantity: '',
    };
    this.handleOpenModal = () => {
      this.setState({ showModal: true });
    };
    this.handleCloseModal = () => {
      this.setState({ showModal: false });
    };
    this.handleChange = (e) => {
      const name = e.target.name;
      const val = e.target.value;
      this.setState({ [name]: val });
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitting...');
      let item = {
        specific_part: this.state.partNumber,
        item_unit_cost: this.state.cost,
        quantity: this.state.quantity,
      };
      API.post(`bom/${this.props.id}/bomitem`, item).then((res) => {
        item = res.data;
        const newBomItems = this.state.bomItems.concat(item);
        this.setState({ bomItems: newBomItems });
      });
      this.handleCloseModal();
    };
    this.handleRemovePart = (itemId) => {
      API.delete(`bom/${this.props.id}/bomitem/${itemId}`);
      let newBomItems = this.state.bomItems;
      const length = newBomItems.length;
      for (let i = 0; i < length; i++) {
        if (newBomItems[i].id === itemId) {
          newBomItems.splice(i, 1);
          this.setState({ bomItems: newBomItems });
          return;
        }
      }
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
      <>
        <Card bg='light' className='bom-card'>
          <Card.Header>BOM {this.props.id}</Card.Header>
          <ListGroup variant='flush'>
            {this.state.bomItems.map((item, key) => (
              <ListGroup.Item key={key}>
                <Item
                  id={item.id}
                  part={item.specific_part}
                  quantity={item.quantity}
                  cost={item.item_unit_cost}
                  handleRemovePart={this.handleRemovePart}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Body>
            <Button onClick={this.handleOpenModal} variant='info'>
              Add New Part
            </Button>
          </Card.Body>
        </Card>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Part</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId='part'>
                <Form.Label>Part ID</Form.Label>
                <Form.Control
                  type='text'
                  name='partNumber'
                  placeholder='Enter part number'
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId='quantity'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type='number'
                  name='quantity'
                  placeholder='Enter quantity'
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  type='number'
                  name='cost'
                  placeholder='Enter price (in cents)'
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Confirm
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default BOM;
