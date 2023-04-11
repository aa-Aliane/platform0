import React from "react";
import Nav from "../components/Nav";
import Words from "../components/Words";
import { useCredentials } from "../hooks/credentials";
import { api } from "../services/api";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = () => {
  const setIsLogged = useCredentials((state: any) => state.setIsLogged);
  return (
    <div>
      <div className="main--container">
        <main>
          <div
            className="btn btn__delete logout fs-m"
            onClick={() => {
              localStorage.setItem("access", "");
              localStorage.setItem("refresh", "");
              setIsLogged(false);
              api.defaults.headers.common["Authorization"] = "";
            }}
          >
            <p>خروج</p>
            <span className="btn__icon">
              <FontAwesomeIcon icon={faSignOut} />
            </span>
          </div>
          
          <Nav />
          <Words />
        </main>
      </div>
    </div>
  );
};

export default Main;
