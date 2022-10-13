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
  const confirm_delete = useWords((state: any) => state.confirm_delete);
  const delete_word = useWords((state: any) => state.delete_word);

  const navigate = useNavigate();

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

  const HandleClick = (icon: string, index: number, id: number) => {
    if (icon === "delete") {
      if (words[index].step === 2) {
        delete_word(index);
        api.delete("words/" + String(id));
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
        {words.map((w: wordType, i: number) => (
          <div className="word" state-hidden={words[i].is_deleted} key={i}>
            <p>{w.word}</p>

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
          </div>
        ))}
      </>
    </div>
  );
};

export default Words;
