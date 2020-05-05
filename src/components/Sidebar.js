import React from 'react';
import SidebarHeader from './Sidebar/SidebarHeader'
import AvailableStocks from './Sidebar/AvailableStocks'
import '../stylesheet/App.css';

function Sidebar() {
  return (
    <div className="Sidebar">
      <SidebarHeader />
      <AvailableStocks />
    </div>
  )
}

export default Sidebar;
