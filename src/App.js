import React, { Component } from 'react';
import axios from 'axios';

import BOM from './components/BOM';

class App extends Component {
  // State
  state = { boms: [] };

  // Get list of BOMs from API
  componentDidMount() {
    axios
      .get('https://5f996efe50d84900163b8a42.mockapi.io/api/v1/bom')
      .then((res) => {
        const boms = res.data;
        this.setState({ boms });
        console.log(this.state.boms);
      });
  }

  render() {
    return (
      <div className='app'>
        <h1>Bill of Materials</h1>
        <div className='bom-container'>
          {
            // Create a Product component for each object in the BOM
            this.state.boms.map((product, key) => {
              return <BOM id={product.id} key={key} />;
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
