import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNewContext } from "../hooks/variablesState";


export interface ContextType {
    word_id : number,
    context: string,
    keywords: string[]
    ref: string,
}

const Context = () => {
  const [keyword, setKeyword] = useState<String>("");
  const [keywords, setKeywords] = useState<String[]>([]);
  const change_context = useNewContext((state: any) => state.change_context)

  return (
    <div className="context--container">
      <div className="context">
        <h2 className="title">السياق</h2>
        <textarea name="context__content"></textarea>
      </div>

      <div className="keywords--container">
        <h2 className="title">
          المصطلاحات المفاتيح ذات العلاقة الموجودة في السياق
        </h2>
        <div className="keywords">
          <input
            className="keywords__title"
            type="text"
            placeholder="كلمة مفتاحية"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                setKeywords([...keywords, keyword]);
                setKeyword("");
              }
            }}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          {keywords.map((k: any, i: number) => (
            <div className="keyword">
              <p className="keyword__item">{k}</p>
              <span className="keyword__delete">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ref--container">
        <h2 className="ref">المرجع</h2>
        <input type="text" />
      </div>

      <div className="control">
        <button className="btn btn__delete" onClick={() => change_context()}>إلغاء</button>
        <button className="btn btn__edit">إضافة</button>
      </div>
    </div>
  );
};

export default Context;
