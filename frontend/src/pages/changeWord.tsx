import React, { useEffect, useReducer, useState } from "react";
import Context from "../components/Context";
import { useNewContext, usePreviews } from "../hooks/variablesState";
import { useLocation } from "react-router-dom";
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
  const delete_word = useContext((state: any) => state.delete_word);

  //init_previews
  // const init_previews = usePreviews((state: any) => state.init_previews)
  
  const previews = usePreviews((state:any) => state.previews)
  const add_preview = usePreviews((state: any) => state.add_preview)

  const [contextsState, contextsDispatch] = useReducer(contextsReducer, []);

  useEffect(() => {
    api.post("get_context/", { word_id: word }).then((res) => {
      init_contexts(res.data);
      // init_previews(res.data.map((x:any) => false))
      res.data.map((x:any)=>add_preview(false))
    });
  }, []);

  useEffect(() => {
    contextsDispatch({
      type: actions.RELOAD,
      payload: contexts,
    });
  }, [contexts]);

  const HandleDelete = (index: number, id: number = 0) => {
    contextsDispatch({
      type: "DELETE",
      payload: index,
    });
    api.delete('contexts/'+String(id))
    .then(()=>console.log('deleted successfully'))
  };

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
            إظافة سياق
          </button>
        )}
        {addContext && <Context word_id={-1} index={-1} />}
      </div>
      {contexts.map((c: any, index: number) => (
        <>
        {!previews[index] && <ContextPreview context={c} index={index} HandleDelete={HandleDelete} />}
        {previews[index] && <OldContext word_id={word.id} index={index} />}
        </>
      ))}
    </div>
  );
};

export default ChangeWord;
