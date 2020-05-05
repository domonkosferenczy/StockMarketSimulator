import React from 'react';
import StocksListElement from 'components/Sidebar/StocksListElement'
import 'stylesheet/App.css';

function StocksList() {
  return (
    <div className="StocksList">
      <StocksListElement ticker={"AAPL"} price={"$241.12"} owned={42} value={"$10 127.04"} chosen={true}/>
      <StocksListElement ticker={"AMAZ"} price={"$321.43"} owned={0} value={"$0"}/>
      <StocksListElement ticker={"AMAZ"} price={"$321.43"} owned={0} value={"$0"}/>
      <StocksListElement ticker={"AMAZ"} price={"$321.43"} owned={0} value={"$0"}/>
      <StocksListElement ticker={"AMAZ"} price={"$321.43"} owned={0} value={"$0"}/>
      <StocksListElement ticker={"AMAZ"} price={"$321.43"} owned={0} value={"$0"}/>
      <StocksListElement ticker={"AMAZ"} price={"$321.43"} owned={0} value={"$0"}/>
    </div>
  )
}

export default StocksList;
