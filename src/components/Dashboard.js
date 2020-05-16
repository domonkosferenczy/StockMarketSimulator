import React from 'react';
import Trade from './Dashboard/Trade'
import Animation from './Dashboard/Animation'
import Analytics from './Dashboard/Analytics'


function Dashboard() {
  return (
    <div className="Dashboard">
      <Trade />
      <Animation />
      <Analytics />
    </div>
  )
}

export default Dashboard;
