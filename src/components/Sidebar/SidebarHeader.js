import React from 'react';
import Arrow from '../Arrow'
import 'stylesheet/App.css';

function SidebarHeader() {
  return (
    <div className="SidebarHeader">
      <div class="SidebarHeader-row">
        <div>
          <div className="SidebarHeader-title">DATE</div>
          <div className="SidebarHeader-value">2020. 04. 01.</div>
        </div>
      </div>
      <div class="SidebarHeader-row">
        <div>
          <div className="SidebarHeader-title">CAPITAL AVAILABLE</div>
          <div className="SidebarHeader-value">$1 400.94</div>
        </div>
      </div>
      <div class="SidebarHeader-row">
        <div>
          <div className="SidebarHeader-title">VALUE OF STOCKS</div>
          <div className="SidebarHeader-value">$13 130.12</div>
        </div>
        <Arrow dir={"up"} />
      </div>
    </div>
  )
}

export default SidebarHeader;
