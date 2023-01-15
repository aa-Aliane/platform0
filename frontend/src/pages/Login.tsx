import React from "react";
import useInput from "../hooks/useInputs";
import { api } from "../services/api";
import { useCredentials } from "../hooks/credentials";

const Login = () => {
  const setIsLogged = useCredentials((state: any) => state.setIsLogged);
  const [cred, setCred] = useInput({
    username: "",
    password: "",
  });

  return (
    <div className="login">
      <input
        type="text"
        className="login__input"
        placeholder="اسم االمستخدم"
        onChange={(e) => setCred(e.target.value, "username")}
      />
      <input
        type="password"
        placeholder="كلمه السر"
        onChange={(e) => setCred(e.target.value, "password")}
      />
      <div
        className="login__submit btn btn__edit"
        onClick={() => {
          console.log("shiitt", cred);
          api
            .post("token/", {
              username: cred.username,
              password: cred.password,
            })
            .then((res) => {
              localStorage.setItem("access", res.data.access);
              localStorage.setItem("refresh", res.data.refresh);
              setIsLogged(true);
              api.defaults.headers.common[
                "Authorization"
              ] = `JWT ${res.data.access}`;
            });
        }}
      >
        تسجيل الدخول
      </div>
    </div>
  );
};

export default Login;
