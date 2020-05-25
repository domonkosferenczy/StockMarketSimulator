import React, { useContext } from "react";
import Sidebar from "./Sidebar/Sidebar";
import GraphContainer from "./Graph/GraphContainer";
import Dashboard from "./Dashboard/Dashboard";
import Messages from "./Global_Components/Messages";
import { DataContext } from "./Store/Data";
import requestAll from "./Global_Components/parseData";
import { StoreContext } from "./Store/Store";

function Simulator() {
  const [state] = useContext(StoreContext);
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
    // Rendering the selected graph types due Analytics
    const graphs = [];
    const graphList = state.animation.shown.filter((e) => e !== null);
    graphList.forEach((element, index) => {
      let ToShow;
      switch (element) {
        case "Chosen":
          ToShow = state.animation.chosen;
          break;
        case "Value Of Stocks":
          ToShow = state.user.history.valueOfStocks;
          break;
        case "Capital Available":
          ToShow = state.user.history.capitalAvailable;
          break;
        default:
          ToShow = element;
          break;
      }
      graphs.push(
        <GraphContainer
          key={"GPH" + index}
          width={graphList.length === 1 ? "100%" : "50%"}
          height={graphList.length === 1 ? "100%" : "50%"}
          show={ToShow}
          title={element}
        />
      );
    });

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
