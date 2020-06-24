import React, { useContext } from "react";
import Sidebar from "./Sidebar/Sidebar";
import GraphContainer from "./Graph/GraphContainer";
import Dashboard from "./Dashboard/Dashboard";
import Messages from "./Global_Components/Messages";
import { DataContext } from "../Store/Data";
import { requestDefault } from "../api/parseData";
import { StoreContext } from "../Store/Store";

function Simulator() {
  const [state, StateDispatch] = useContext(StoreContext);
  const [data, DataDispatch] = useContext(DataContext);

  // Loading data from API
  const loadData = async () => {
    const date = await requestDefault();

    const firstChosen = Object.keys(date.stocks)[0];
    const secondChosen = Object.keys(date.stocks)[1];
    const firstDate = date.dates[0];
    console.log(firstDate);
    console.log(state);
    DataDispatch({ type: "SET_DATA", payload: date });
    StateDispatch({
      type: "SET_STATE",
      payload: {
        firstChosen: firstChosen,
        secondChosen: secondChosen,
        firstDate: firstDate,
      },
    });
  };

  // If the data loaded, rendering the app
  if (data.loaded === false || state.loaded === false) {
    loadData();
    return (
      <div className="Loading">
        <span> Loading... </span>{" "}
      </div>
    );
  } else {
    // Rendering the selected graph types due Analytics
    const graphs = [];
    const graphList = state.animation.shown;
    let height = "50%";
    if (state.animation.timestamp) {
      height = "40%";
    } else {
      height = "50%";
    }
    let position = "relative";
    let top = null;
    let bottom = null;
    if (graphList.filter(Boolean).length === 1 && state.animation.timestamp) {
      position = "absolute";
      top = 0;
      bottom = 0;
    }
    if (graphList.filter(Boolean).length === 1) {
      if (state.animation.timestamp) {
        height = "80%";
      } else {
        height = "100%";
      }
    }
    graphList.forEach((element, index) => {
      graphs.push(
        <GraphContainer
          key={"GPH" + index}
          width={graphList.filter(Boolean).length === 1 ? "100%" : "50%"}
          height={height}
          position={position}
          show={element}
          index={index}
          top={top}
        />
      );
    });
    graphs.push(
      <GraphContainer
        key={"GPHL"}
        width={"100%"}
        height="20%"
        show={"timestamp"}
        index={5}
        position={position}
        hide={!state.animation.timestamp}
        bottom={bottom}
      />
    );

    return (
      <div className="App">
        <Messages />
        <Sidebar />
        <div className="AppRightSection" id="appright">
          <div className="Graphs">{graphs}</div>
          <Dashboard />
        </div>{" "}
      </div>
    );
  }
}

export default Simulator;
