import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNewContext, usePreviews } from "../hooks/variablesState";
import { useContext } from "../hooks/contextState";
import { api } from "../services/api";
import useInput from "../hooks/useInputs";

const OldContext = ({ index }: { index: number }) => {
  const [keyword, setKeyword] = useState<String>("");
  const [keywords, setKeywords] = useState<String[]>([]);

  const change_preview = usePreviews((state: any) => state.change_preview);
  const update_context = useContext((state: any) => state.update_context);
  const old_context = useContext((state: any) => state.contexts[index]);


  const [context, setContext] = useInput({
    context: old_context.context,
    keywords: old_context.keywords,
    ref: old_context.ref,
  });

  useEffect(() => {
    setKeywords(old_context.keywords.split(" "));
  }, []);

  return (
    <div className="context--container">
      <div className="context">
        <h2 className="title">السياق</h2>
        <textarea
          name="context__content"
          value={context.context}
          onChange={(e) => setContext(e.target.value, "context")}
        ></textarea>
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
                setContext(context.keywords + " " + keyword, "keywords");
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
        <input
          type="text"
          value={context.ref}
          onChange={(e) => setContext(e.target.value, "ref")}
        />
      </div>

      <div className="control">
        <button
          className="btn btn__delete"
          onClick={() => change_preview(index)}
        >
          إلغاء
        </button>
        <button
          className="btn btn__edit"
          onClick={() => {
            update_context(index, context);
            change_preview(index);
          }}
        >
          تغيير
        </button>
      </div>
    </div>
  );
};

export default OldContext;
