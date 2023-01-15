import React, { useReducer, useEffect, useState } from "react";
import Button from "./Button";

import { useWords } from "../hooks/wordsState";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { actions } from "../hooks/actions";

export interface wordType {
  id: number;
  word: string;
  created_at: string;
  definition: string;
  is_deleted: string;
  is_selected: false;
  step: number;
  name: string;
}

type wordsStateType = wordType[];

interface wordsActionType {
  type: string;
  payload: any;
}

const Words: React.FC = () => {
  const init_words = useWords((state: any) => state.init_words);
  const words = useWords((state: any) => state.words);
  const filter = useWords((state: any) => state.filter);
  const confirm_delete = useWords((state: any) => state.confirm_delete);
  const delete_word = useWords((state: any) => state.delete_word);
  const select_word = useWords((state: any) => state.select_word);

  const navigate = useNavigate();

  const filterWords = (ws: wordType[]) => {
    if (!filter) return ws;
    return ws.filter((w: wordType) => w.word.includes(filter));
  };

  useEffect(() => {
    api.get("words").then((res: any) => {
      init_words(
        res.data.map((w: any) => ({
          ...w,
          is_deleted: "false",
          step: 0,
          name: "حذف",
        }))
      );
    });
  }, []);

  const postFailedWordDel = (id: any) => {
    const refresh = localStorage.getItem("refresh");
    api.post("token/refresh/", { refresh: refresh }).then((res) => {
      localStorage.setItem("access", res.data.access);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access}`;
    });
    api.delete("words/" + String(id));
  };

  const HandleClick = (icon: string, index: number, id: number) => {
    if (icon === "delete") {
      if (words[index].step === 2) {
        delete_word(index);
        api.delete("words/" + String(id)).catch((err) => postFailedWordDel(id));
        words[index].step = 1;
        words[index].name = "حذف";
      } else {
        confirm_delete(index);
        if (words[index].step === 1) {
          words[index].name = "تاأكيد(1/2)";
        } else {
          words[index].name = "تاأكيد(2/2)";
        }
      }
    }
    if (icon === "edit") {
      console.log("edit", id);
      navigate("change_word", {
        state: {
          word: id,
          word_ar: words[index].word,
          word_fr: words[index].word_fr,
          word_en: words[index].word_en,
        },
      });
    }
  };

  return (
    <div className="words">
      <>
        {filter}
        {filterWords(words).map((w: wordType, i: number) => (
          <div className="word" state-hidden={words[i].is_deleted} key={i}>
            <div className="word__content">{w.word}</div>

            <Button
              name={w.name}
              icon={"delete"}
              HandleClick={HandleClick}
              id={w.id}
              index={i}
            />
            <Button
              name={"مراجعة"}
              icon={"edit"}
              HandleClick={HandleClick}
              id={w.id}
              index={i}
            />
            <span
              className="word--selector"
              data-selected={w.is_selected}
              onClick={() => select_word(i, !w.is_selected)}
            ></span>
          </div>
        ))}
      </>
    </div>
  );
};

export default Words;
