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
      <div className='app'>
        <h1>Bill of Materials</h1>
        <div className='bom-container'>
          {
            // Create a Product component for each object in the BOM
            this.state.bomIdList.map((bom, key) => {
              return (
                <BOM id={bom.id} key={key} handleAddPart={this.handleAddPart} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
