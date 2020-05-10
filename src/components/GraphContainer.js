import React, { useLayoutEffect, useState, useContext, useEffect} from 'react';
import Graph from './Graph'
import 'stylesheet/App.css';
import { StoreContext } from './Store';
import { DataContext } from './Data';

function GraphContainer() {
  
 return (
    <div className="GraphContainer" id="GraphID">
        <Graph />
    </div>
  )
}


export default GraphContainer;
