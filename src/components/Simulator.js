import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import GraphContainer from "./Graph/GraphContainer";
import Dashboard from "./Dashboard";
import { DataContext } from "./Store/Data";
import requestAll from "./Global_Components/parseData";

function Simulator() {
  const [data, dispatch] = useContext(DataContext);

  // Loading data from API
  const loadData = async () => {
    const date = await requestAll();
    dispatch({ type: "SET_DATA", payload: date });
  };

  // If the data loaded, rendering the app
  if (data.loaded === false) {
    loadData();
    return (
      <div className="Loading">
        <span> Loading... </span>{" "}
      </div>
    );
  } else {
    return (
      <div className="App">
        <Sidebar />
        <div className="AppRightSection" id="appright">
          <GraphContainer />
          <Dashboard />
        </div>{" "}
      </div>
    );
  }
}

export default Simulator;
