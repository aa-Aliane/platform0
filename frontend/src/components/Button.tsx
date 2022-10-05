import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { wordType } from "./Words";


export type HandleClickType = (icon: string, index:number, id:number) => void;



const Button = ({
  name,
  icon,
  HandleClick,
  id,
  index,
}: {
  name: string;
  icon: string;
  HandleClick: HandleClickType;
  id:number;
  index: number;
}) => {
  const [btnType, setBtnType] = useState("");
  

  useEffect(() => {
    if (icon === "edit") {
      setBtnType("btn btn__edit");
    } else if (icon === "delete") {
      setBtnType("btn btn__delete");
    } else {
      setBtnType("btn btn__new");
    }
  }, []);
  return (
    <div className={btnType} onClick={() => HandleClick(icon, index, id)}>
      <span className="btn__icon">
        {icon === "delete" && <FontAwesomeIcon icon={faTrash} />}
        {icon === "edit" && <FontAwesomeIcon icon={faPenToSquare} />}
        {icon === "new" && <FontAwesomeIcon icon={faPlus} />}
      </span>
      <p className="btn__text">{name}</p>
    </div>
  );
};

export default Button;
