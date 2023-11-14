import React, { useEffect, useReducer, useState } from "react";
import Context from "../components/Context";
import { useNewContext, usePreviews } from "../hooks/variablesState";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { actions } from "../hooks/actions";
import {
  contextsActionType,
  contextsStateType,
  useContext,
} from "../hooks/contextState";
import ContextPreview from "../components/ContextPreview";
import { faHourglass2 } from "@fortawesome/free-solid-svg-icons";
import { wordType } from "../components/Words";
import OldContext from "../components/OldContext";
import useInput from "../hooks/useInputs";

const contextsReducer = (
  state: contextsStateType,
  action: contextsActionType
) => {
  switch (action.type) {
    case actions.PRE_DELETE:
      return state.map((w: any, i: number) => {
        if (i === action.payload) {
          return { ...w, is_deleted: "true" };
        }
        return w;
      });

    case actions.DELETE:
      return state.filter((w: any, i: number) => i !== action.payload);

    case actions.RELOAD:
      return action.payload;

    default:
      return state;
  }
};

const ChangeWord = () => {
  //   const [addContext, setAddContext] = useState(false);
  const addContext = useNewContext((state: any) => state.newContext);
  const change_context = useNewContext((state: any) => state.change_context);

  const location = useLocation();
  const word = location.state.word;

  //init context
  const init_contexts = useContext((state: any) => state.init_contexts);
  const contexts = useContext((state: any) => state.contexts);
  const delete_context = useContext((state: any) => state.delete_context);
  const delete_word = useContext((state: any) => state.delete_word);

  //init_previews
  // const init_previews = usePreviews((state: any) => state.init_previews)

  const previews = usePreviews((state: any) => state.previews);
  const add_preview = usePreviews((state: any) => state.add_preview);

  const [contextsState, contextsDispatch] = useReducer(contextsReducer, []);

  const navigate = useNavigate();

  const postFailedWordUp = (word: any) => {
    const refresh = localStorage.getItem("refresh");
    api.post("token/refresh/", { refresh: refresh }).then((res) => {
      localStorage.setItem("access", res.data.access);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access}`;
    });
    api.post("update_word/", word).then(() => navigate("/"));
  };

  const [entry, setEntry] = useInput({
    word_ar: "",
    word_fr: "",
    word_en: "",
    def: "",
  });

  const [step, setStep] = useState(1);

  useEffect(() => {
    api.get("words/" + word).then((res) => {
      setEntry(res.data.word, "word_ar");
      setEntry(res.data.word_en, "word_en");
      setEntry(res.data.word_fr, "word_fr");
      setEntry(res.data.definition, "def");
    });
    api.post("get_context/", { word_id: word }).then((res) => {
      init_contexts(res.data);
      res.data.map((x: any) => add_preview(false));
    });
  }, []);

  useEffect(() => {
    console.log("ohh ", contexts);
  }, [contexts]);

  const HandleDelete = (index: number, id: number = 0) => {
    delete_context(index);
  };

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
      </div>
      {contexts.map((c: any, index: number) => (
        <>
          {!previews[index] && (
            <ContextPreview
              context={c}
              index={index}
              HandleDelete={HandleDelete}
            />
          )}
          {previews[index] && <OldContext word_id={word.id} index={index} />}
        </>
      ))}

      <div className="control">
        <div className="btn btn__delete" onClick={() => navigate("/")}>
          إلغاء
        </div>
        <div
          className="btn btn__new"
          onClick={() => {
            if (step === 3) {
              api
                .post("update_word/", {
                  word_ar: entry.word_ar,
                  word_en: entry.word_en,
                  word_fr: entry.word_fr,
                  def: entry.def,
                  contexts: contexts,
                  word_id: word,
                })
                .then((res) => {
                  setStep(1);
                  navigate("/");
                })
                .catch((err) => {
                  postFailedWordUp({
                    word_ar: entry.word_ar,
                    word_en: entry.word_en,
                    word_fr: entry.word_fr,
                    def: entry.def,
                    contexts: contexts,
                    word_id: word,
                  });
                });
            } else {
              setStep(step + 1);
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

export default ChangeWord;
