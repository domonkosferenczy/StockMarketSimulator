import React from "react";
import SidebarHeader from "./SidebarHeader";
import AvailableStocks from "./AvailableStocks";

function Sidebar() {
  return (
    <div className="Sidebar">
      <SidebarHeader />
      <AvailableStocks />
    </div>
  );
}

export default Sidebar;
