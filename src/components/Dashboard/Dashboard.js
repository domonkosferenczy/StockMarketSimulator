import React from "react";
import Trade from "./Trade";
import Animation from "./Animation";
import Analytics from "./Analytics";

function Dashboard() {
  return (
    <div className="Dashboard">
      <Trade />
      <Animation />
      <Analytics />
    </div>
  );
}

export default Dashboard;
