import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";

const Nav = () => {
  const navigate = useNavigate();
  const HandleClick = (icon: string, index: number, id: number) => {
    navigate("new");
  };

  return (
    <div className="menu">
      <input type="text" />
      <Button
        name={"كلمة جديدة"}
        icon="new"
        HandleClick={HandleClick}
        id={0}
        index={0}
      />
    </div>
  );
};

export default Nav;
