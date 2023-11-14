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
import { Navigate, useNavigate } from "react-router-dom";
import { useWords } from "../hooks/wordsState";

const NewWord = () => {
  //   const [addContext, setAddContext] = useState(false);
  const addContext = useNewContext((state: any) => state.newContext);
  const change_context = useNewContext((state: any) => state.change_context);
  const contexts = useContext((state: any) => state.contexts);
  const init_contexts = useContext((state: any) => state.init_contexts);
  const delete_context = useContext((state: any) => state.delete_context);
  const previews = usePreviews((state: any) => state.previews);
  const add_preview = usePreviews((state: any) => state.add_preview);

  const navigate = useNavigate();

  const postFailedWord = (word: any) => {
    const refresh = localStorage.getItem("refresh");
    api.post("token/refresh/", { refresh: refresh }).then((res) => {
      localStorage.setItem("access", res.data.access);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access}`;
    });
    api.post("post_word/", word).then(() => navigate("/"));
  };

  const [entry, setEntry] = useInput({
    word_ar: "",
    word_fr: "",
    word_en: "",
    def: "",
  });

  const [step, setStep] = useState(1);
  const [wordError, setWordError] = useState("false");

  const HandleDelete = (index: number, id: number = 0) => {
    delete_context(index);
  };

  useEffect(() => {
    init_contexts([]);
  }, []);

  return (
    <div className="main--container">
      <div className="word--container">
        <h4 className="title">المصطلح</h4>
        <div className="new--word">
          <input
            type="text"
            className="word"
            placeholder="المصطلح بلعربية"
            value={entry.word_ar}
            onChange={(e) => setEntry(e.target.value, "word_ar")}
            data-error={wordError}
            onClick={() => setWordError("false")}
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

      <div className="definition">
        <textarea
          className="definition__content"
          placeholder="التعريف"
          value={entry.def}
          onChange={(e) => setEntry(e.target.value, "def")}
        ></textarea>
      </div>

      <div className="contexts">
        <h4 className="title">السياقات</h4>
        {!addContext && (
          <div
            className="btn btn__new context__new"
            onClick={() => change_context(true)}
          >
            إظافة سياق
          </div>
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
        <div className="btn btn__delete" onClick={() => navigate("/")}>
          إلغاء
        </div>
        <div
          className="btn btn__new"
          onClick={() => {
            if (step === 3) {
              api
                .post("post_word/", {
                  word_ar: entry.word_ar,
                  word_en: entry.word_en,
                  word_fr: entry.word_fr,
                  def: entry.def,
                  contexts: contexts,
                })
                .then((res) => {
                  setStep(1);
                  navigate("/");
                })
                .catch((err) => {
                  postFailedWord({
                    word_ar: entry.word_ar,
                    word_en: entry.word_en,
                    word_fr: entry.word_fr,
                    def: entry.def,
                    contexts: contexts,
                  });
                });
            } else {
              if (entry.word_ar) setStep(step + 1);
              else setWordError("true");
            }
          }}
        >
          {step === 1 && "حفظ"}
          {step === 2 && "تاأكيد(1/2)"}
          {step === 3 && "تاأكيد(2/2)"}
        </div>
      </div>
    </div>
  );
};

export default NewWord;
