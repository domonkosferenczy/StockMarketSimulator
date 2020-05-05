import React from 'react';
import Trade from './Dashboard/Trade'
import Animation from './Dashboard/Animation'
import Analytics from './Dashboard/Analytics'
import 'stylesheet/App.css';

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
