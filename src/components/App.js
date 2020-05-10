import React, { useContext, useState } from 'react';
import '../stylesheet/App.css';
import { Store } from './Store';
import { Data } from './Data';
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
