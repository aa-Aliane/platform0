import React, { useEffect, useState } from "react";
import Context from "../components/Context";
import { useNewContext } from "../hooks/variablesState";
import { useLocation } from "react-router-dom";
import { api } from "../services/api";

const NewWord = () => {
  //   const [addContext, setAddContext] = useState(false);
  const addContext = useNewContext((state: any) => state.newContext);
  const change_context = useNewContext((state: any) => state.change_context);

  const location = useLocation();
  const word = location.state.word;

  useEffect(()=>{
      api.get('get_word')
  },[])

  return (
    <div className="main--container">
      <div className="word--container">
        <h2 className="title">المصطلح</h2>
        <div className="new--word">
          <input type="text" className="word" placeholder="المصطلح بلعربية" />
          <input type="text" className="word" placeholder="المصطلح بلفرنسية" />
          <input
            type="text"
            className="word"
            placeholder="االمصطلح بلانجليزية"
          />
        </div>
      </div>

      <div className="contexts">
        <h2 className="title">السياقات</h2>
        {!addContext && (
          <button
            className="btn btn__new context__new"
            onClick={() => change_context()}
          >
            إظافة سياق{word}
          </button>
        )}
        {addContext && <Context />}
      </div>
    </div>
  );
};

export default NewWord;
