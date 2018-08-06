import React, { Component } from 'react';
import Layout from './components/layouts/layout';
import BurgerBuilder from "./containers/BurgerBulider/Burgerbulider";

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
              <BurgerBuilder/>
          </Layout>

      </div>
    );
  }
}

export default App;
