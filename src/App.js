// Import React and libraries
import React, { Component } from 'react';

// Import bootstrap components
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Import components
import BOM from './components/BOM';
import API from './api';

// App component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bomIdList: [],
      showModal: false,
      bomId: '',
      partNumber: '',
      cost: '',
      quantity: '',
    };
    this.handleAddPart = (id) => {
      this.setState({ showModal: true });
      this.setState({ bomId: id });
    };
    this.handleClose = () => {
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
      const item = {
        specific_part: this.state.partNumber,
        item_unit_cost: this.state.cost,
        quantity: this.state.quantity,
      };
      API.post(`bom/${this.state.bomId}/bomitem`, item).then((res) => {
        console.log('Response: ' + res);
      });
      this.handleClose();
    };
  }

  // Get list of BOMs from API
  componentDidMount() {
    API.get(`bom`).then((res) => {
      const bomIdList = res.data;
      this.setState({ bomIdList });
    });
  }

  render() {
    return (
      <>
        <div className='app'>
          <h1>Bill of Materials</h1>
          <div className='bom-container'>
            {
              // Create a Product component for each object in the BOM
              this.state.bomIdList.map((bom, key) => {
                return (
                  <BOM
                    id={bom.id}
                    key={key}
                    handleAddPart={this.handleAddPart}
                  />
                );
              })
            }
          </div>

          <Modal show={this.state.showModal} onHide={this.handleClose}>
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
        </div>
      </>
    );
  }
}

export default App;
