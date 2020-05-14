import React, {useContext} from 'react'
import Sidebar from './Sidebar'
import GraphContainer from './GraphContainer'
import Dashboard from './Dashboard'
import { DataContext } from './Data'
import requestAll from './parseData'

function Simulator() {

    const [data, dispatch] = useContext(DataContext)

  
    const loadData = async () => {
      const date = await requestAll()
      dispatch({type: "SET_DATA", payload: date})
    }
    
    if (data.loaded === false){
      loadData()
      return (
        <div 
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 26
            }}>
                <span>Loading...</span>
            </div>      
    )
    } else {

        return (
            <div className="App">
                <Sidebar />
                <div className="AppRightSection" id="appright">
                    <GraphContainer />
                    <Dashboard />
                </div>
            </div>
        )
    }
}

export default Simulator