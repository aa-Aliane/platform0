import React, { useState } from "react";
import Context from "../components/Context";
import { useNewContext } from "../hooks/variablesState";

const NewWord = () => {

//   const [addContext, setAddContext] = useState(false);
  const addContext = useNewContext((state: any) => state.newContext)
  const change_context = useNewContext((state: any) => state.change_context)

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
        {!addContext && <button className="btn btn__new context__new" onClick={()=>change_context(true)}>إظافة سياق</button>}
        {addContext && <Context />}
      </div>
    </div>
  );
};

export default NewWord;
