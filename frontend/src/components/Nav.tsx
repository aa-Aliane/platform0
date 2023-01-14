import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useWords } from "../hooks/wordsState";

const Nav = () => {
  const navigate = useNavigate();
  const n_words = useWords((state: any) => state.n_words);
  const HandleClick = (icon: string, index: number, id: number) => {
    navigate("new");
  };

  return (
    <div className="menu">
      {n_words!==0 && <input type="text" placeholder="بحث" />}
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
