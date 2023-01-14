import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  useEffect(() => {
    try {
      localStorage.getItem("access");
    } catch {
      console.log("");
    }
  }, []);
  return (
    <div className="App">
      <Login />
      {/* <Main /> */}
    </div>
  );
}

export default App;
