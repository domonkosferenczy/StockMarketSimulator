import React from 'react';
import '../stylesheet/App.css';
import { Store } from './Store/Store';
import { Data } from './Store/Data';
import Simulator from './Simulator'

function App() {
    return (
      <Data> 
        <Store>
          <Simulator />
        </Store>
      </Data>
    )

  }


export default App;
