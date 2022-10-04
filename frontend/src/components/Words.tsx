import React, { useReducer, useEffect, useState } from "react";
import Button from "./Button";

import { useWords } from "../hooks/wordsState";
import { api } from "../services/api";
import { useNavigate } from "react-router";

const actions: any = {
  INIT: "INIT",
  PRE_DELETE: "PRE_DELETE",
  DELETE: "DELETE",
  RELOAD: "RELOAD",
};

export interface wordType {
  id: number;
  word: string;
  created_at: string;
  definition: string;
  is_deleted: string;
}

type wordsStateType = wordType[];

interface wordsActionType {
  type: string;
  payload: any;
}

const wordsReducer = (state: wordsStateType, action: wordsActionType) => {
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

const Words: React.FC = () => {
  const init_words = useWords((state: any) => state.init_words);
  const words = useWords((state: any) => state.words);
  const delete_word = useWords((state: any) => state.delete_word);

  const [wordsState, wordsDispatch] = useReducer(wordsReducer, []);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("words").then((res: any) => {
      console.log(res.data);
      init_words(res.data.map((w: any) => ({ ...w, is_deleted: "false" })));
    });
  }, []);

  useEffect(() => {
    console.log(words);
    wordsDispatch({
      type: "RELOAD",
      payload: words,
    });
  }, [words]);

  const HandleClick = (icon: string, index: number, id: number) => {
    if (icon === "delete") {
      delete_word(index);
      wordsDispatch({
        type: "DELETE",
        payload: index,
      });
      console.log(index);
      api.delete("words/" + String(id));
    }
    if (icon === "edit") {
      console.log("edit ", id);
      navigate("change_word", { state: { word: id } });
    }
  };

  return (
    <div className="words">
      <>
        {wordsState.map((w: any, i: number) => (
          <div className="word" state-hidden={wordsState[i].is_deleted} key={i}>
            <Button
              name={"مراجعة"}
              icon={"edit"}
              HandleClick={HandleClick}
              id={w.id}
              index={i}
            />
            <Button
              name={"حذف"}
              icon={"delete"}
              HandleClick={HandleClick}
              id={w.id}
              index={i}
            />
            <p>{w.word}</p>
          </div>
        ))}
      </>
    </div>
  );
};

export default Words;
