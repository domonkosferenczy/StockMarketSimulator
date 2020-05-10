import React from 'react';
import Sidebar from './Sidebar';
import GraphContainer from './GraphContainer';
import Dashboard from './Dashboard';
import '../stylesheet/App.css';
import {Store} from './Store';

function App() {

  return (
    <Store>
      <div className="App">
        <Sidebar />
        <div className="AppRightSection" id="appright">
          <GraphContainer />
          <Dashboard />
        </div>
      </div>
    </Store>
  )
}



export default App;
