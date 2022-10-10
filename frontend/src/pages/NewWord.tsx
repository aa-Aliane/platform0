import React, { useEffect, useState } from "react";
import Context from "../components/Context";
import useInput from "../hooks/useInputs";
import { useNewContext, usePreviews } from "../hooks/variablesState";
import {
  contextsActionType,
  contextsStateType,
  useContext,
} from "../hooks/contextState";
import ContextPreview from "../components/ContextPreview";
import OldContext from "../components/OldContext";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const NewWord = () => {
  //   const [addContext, setAddContext] = useState(false);
  const addContext = useNewContext((state: any) => state.newContext);
  const change_context = useNewContext((state: any) => state.change_context);
  const contexts = useContext((state: any) => state.contexts);
  const init_contexts = useContext((state: any) => state.init_contexts);
  const delete_context = useContext((state:any) => state.delete_context)
  const previews = usePreviews((state: any) => state.previews);
  const add_preview = usePreviews((state: any) => state.add_preview);


  const navigate = useNavigate()

  const [entry, setEntry] = useInput({
    word_ar: "",
    word_fr: "",
    word_en: "",
  });

  const HandleDelete = (index: number, id: number = 0) => {
    delete_context(index);
  };

  useEffect(()=> {
    init_contexts([])
  },[])

  return (
    <div className="main--container">
      <div className="word--container">
        <h2 className="title">المصطلح</h2>
        <div className="new--word">
          <input
            type="text"
            className="word"
            placeholder="المصطلح بلعربية"
            value={entry.word_ar}
            onChange={(e) => setEntry(e.target.value, "word_ar")}
          />
          <input
            type="text"
            className="word"
            placeholder="المصطلح بلفرنسية"
            value={entry.word_fr}
            onChange={(e) => setEntry(e.target.value, "word_fr")}
          />
          <input
            type="text"
            className="word"
            placeholder="االمصطلح بلانجليزية"
            value={entry.word_en}
            onChange={(e) => setEntry(e.target.value, "word_en")}
          />
        </div>
      </div>

      <div className="contexts">
        <h2 className="title">السياقات</h2>
        {!addContext && (
          <button
            className="btn btn__new context__new"
            onClick={() => change_context(true)}
          >
            إظافة سياق
          </button>
        )}
        {addContext && <Context />}
        {contexts.map((c: any, index: number) => (
          <>
            {!previews[index] && (
              <ContextPreview
                context={c}
                index={index}
                HandleDelete={HandleDelete}
              />
            )}
            {previews[index] && <OldContext index={index} />}
          </>
        ))}
      </div>
      <div className="control">
        <button className="btn btn__delete" onClick={() => navigate("/")}>
          إلغاء
        </button>
        <button
          className="btn btn__new"
          onClick={() => {
            api
              .post("post_word/", {
                word_ar: entry.word_ar,
                word_en: entry.word_en,
                word_fr: entry.word_fr,
                contexts: contexts,
              })
              .then((res) => console.log(res.data));
          }}
        >
          حفظ
        </button>
      </div>
    </div>
  );
};

export default NewWord;
