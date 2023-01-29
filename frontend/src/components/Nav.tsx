import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useWords } from "../hooks/wordsState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const navigate = useNavigate();
  const n_words = useWords((state: any) => state.n_words);
  const setFilter = useWords((state: any) => state.setFilter);
  const n_selected = useWords((state: any) => state.n_selected);
  const d_selected_step = useWords((state: any) => state.d_selected_step);
  const confirm_d_selected = useWords((state: any) => state.confirm_d_selected);
  const delete_selected = useWords((state: any) => state.delete_selected);
  const HandleClick = (icon: string, index: number, id: number) => {
    navigate("new");
  };




  return (
    <div className="menu">
      {n_words !== 0 && (
        <input
          type="text"
          placeholder="بحث"
          onChange={(e) => setFilter(e.target.value)}
        />
      )}
      {n_words === 0 && <h3>لا توجد أي كلمة في القاموس</h3>}
      {n_selected !== 0 && (
        <div
          className="btn btn__delete"
          onClick={() => {
            if (d_selected_step === 2) delete_selected();
            else confirm_d_selected();
          }}
        >
          <span className="btn__icon">
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <p className="btn__text--2">حذف الكلمات</p>
          {d_selected_step !== 0 && `(${d_selected_step}/2)`}
        </div>
      )}
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
