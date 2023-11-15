import React, { useReducer, useEffect, useState } from "react";
import Button from "./Button";

import { useWords } from "../hooks/wordsState";
import { usePagination } from "../hooks/paginationState";
import { Pagination, PaginationInfo } from "../components/Pagination";
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
  const words = useWords((state: any) => state.words);
  const filter = useWords((state: any) => state.filter);
  const filtered = useWords((state: any) => state.filtered);
  const set_filtered = useWords((state: any) => state.set_filtered);
  const confirm_delete = useWords((state: any) => state.confirm_delete);
  const delete_word = useWords((state: any) => state.delete_word);
  const select_word = useWords((state: any) => state.select_word);

  // pagination
  const current_page = usePagination((state: any) => state.current_page);
  const words_per_page = usePagination((state: any) => state.words_per_page);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(Math.min(words.length, 10));

  useEffect(() => {
    setStart(current_page * words_per_page - words_per_page);
    setEnd(Math.min(current_page * words_per_page, filtered.length));
  }, [current_page, words_per_page, filtered]);

  useEffect(() => {
    if (!filter) set_filtered(words);
    else set_filtered(words.filter((w: wordType) => w.word.includes(filter)));
  }, [words, filter]);

  // ***************************
  const navigate = useNavigate();

  

  const HandleClick = (icon: string, index: number, id: number) => {
    if (icon === "delete") {
      if (filtered[index].step === 2) {
        delete_word(index, id);
        
        filtered[index].step = 1;
        filtered[index].name = "حذف";
      } else {
        confirm_delete(index);
        if (filtered[index].step === 1) {
          filtered[index].name = "تاأكيد(1/2)";
        } else {
          filtered[index].name = "تاأكيد(2/2)";
        }
      }
    }
    if (icon === "edit") {
      console.log("edit", id);
      navigate("change_word", {
        state: {
          word: id,
          word_ar: filtered[index].word,
          word_fr: filtered[index].word_fr,
          word_en: filtered[index].word_en,
        },
      });
    }
  };

  return (
    <div className="words">
      <PaginationInfo nb_words={filtered.length} />
      <ul className="words__container">
        <>
          {filtered.slice(start, end).map((w: wordType, i: number) => (
            <li className="word" state-hidden={words[i].is_deleted} key={i}>
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
                onClick={() =>
                  select_word(
                    words_per_page * (current_page - 1) + i,
                    !w.is_selected
                  )
                }
              ></span>
            </li>
          ))}
        </>
      </ul>
      <Pagination />
    </div>
  );
};

export default Words;
