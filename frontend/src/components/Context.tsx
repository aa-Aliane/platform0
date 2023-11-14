import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNewContext, usePreviews } from "../hooks/variablesState";

import { useContext } from "../hooks/contextState";
import useInput from "../hooks/useInputs";

const Context = () => {
  const [contextError, setContextError] = useState<String>("false");
  const [keyword, setKeyword] = useState<String>("");
  const [keywords, setKeywords] = useState<String[]>([]);
  const change_context = useNewContext((state: any) => state.change_context);

  const add_context = useContext((state: any) => state.add_context);
  const add_preview = usePreviews((state: any) => state.add_preview);
  const previews = usePreviews((state: any) => state.previews);
  const close_all = usePreviews((state: any) => state.close_all);

  const [context, setContext] = useInput({
    context: "",
    keywords: "",
    ref: "",
  });

  useEffect(() => {
    close_all();
  }, []);

  return (
    <div className="context--container">
      <div className="context">
        <h4 className="title">السياق</h4>
        <textarea
          className="context__content"
          value={context.context}
          data-error={contextError}
          onChange={(e) => setContext(e.target.value, "context")}
          onClick={() => setContextError("false")}
          placeholder={context.context === "" ? "يرجى كتابة السياق" : ""}
        ></textarea>
      </div>

      <div className="keywords--container">
        <h4 className="title">
          المصطلاحات المفاتيح ذات العلاقة الموجودة في السياق
        </h4>
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
              <span
                className="keyword__delete"
                onClick={() => {
                  setKeywords(keywords.filter((x, j) => i !== j));
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ref--container">
        <h4 className="ref">المرجع</h4>
        <input
          type="text"
          value={context.ref}
          onChange={(e) => setContext(e.target.value, "ref")}
        />
      </div>

      <div className="control">
        <div className="btn btn__delete" onClick={() => change_context(false)}>
          إلغاء
        </div>
        <div
          className="btn btn__edit"
          onClick={() => {
            if (context.context) {
              const c = {
                id: -1,
                word_id: -1,
                context: context.context,
                ref: context.ref,
                keywords: keywords.join(" "),
              };
              add_context(c);
              add_preview(false);
              console.log(previews);
            } else {
              setContextError("true");
            }
          }}
        >
          إضافة
        </div>
      </div>
    </div>
  );
};

export default Context;
