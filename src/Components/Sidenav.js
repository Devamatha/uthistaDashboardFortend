import React from "react";
import ExpandableList from "./ExpandableList";

function Sidenav() {
  return (
    <div className="d-flex fixed py-8 px-4 flex-col align-items-start items-start gap-5 shrink-0 h-screen " >
      <ExpandableList/>
    </div>
  );
}

export default Sidenav;
