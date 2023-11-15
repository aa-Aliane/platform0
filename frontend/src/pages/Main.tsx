import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Words from "../components/Words";
import { useWords } from "../hooks/wordsState";
import { useCredentials } from "../hooks/credentials";
import { api } from "../services/api";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = () => {
  const setIsLogged = useCredentials((state: any) => state.setIsLogged);
  const init_words = useWords((state: any) => state.init_words);
  const updated = useWords((state: any) => state.updated);
  const set_updated = useWords((state: any) => state.set_updated);

  useEffect(() => {
    setTimeout(()=>{})
    api.get("words").then((res: any) => {
      init_words(
        res.data.map((w: any) => ({
          ...w,
          is_deleted: "false",
          step: 0,
          name: "حذف",
        }))
      );
      if (updated) set_updated(false);
      console.log("🚀 ~ file: Main.tsx:27 ~ api.get ~ updated:", updated);
    });
  }, [, updated]);

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
