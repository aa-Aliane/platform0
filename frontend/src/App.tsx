import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { api } from "./services/api";
import { useCredentials } from "./hooks/credentials";

function App() {
  const isLogged = useCredentials((state: any) => state.isLogged);
  const setIsLogged = useCredentials((state: any) => state.setIsLogged);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    api
      .post("token/verify/", { token: access })
      .then(() => {
        api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        setIsLogged(true);
      })
      .catch((err) => {
        console.log("🚀 ~ file: App.tsx:23 ~ useEffect ~ err", err);

        api.post("token/refresh/", { refresh: refresh }).then((res) => {
          localStorage.setItem("access", res.data.access);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access}`;
          setIsLogged(true);
        });
      });
  }, []);
  return (
    <div className="App">
      {!isLogged && <Login />}
      {isLogged && <Main />}
    </div>
  );
}

export default App;
