import React from "react";
import Nav from "../components/Nav";
import Words from "../components/Words";


const Main = () => {
  return (
    <div>
      <div className="main--container">
        <main>
          <Nav />
          <Words />
        </main>
      </div>
    </div>
  );
};

export default Main;
