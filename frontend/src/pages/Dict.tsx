import React, { useEffect } from "react";
import { useWords } from "../hooks/wordsState";
import { api } from "../services/api";

const Dict = () => {
  const words = useWords((state: any) => state.words);
  const init_words = useWords((state: any) => state.init_words);

  useEffect(() => {
    api.get("words/").then((res: any) => {
      api.post("get_context/", { word_id: res.data.id }).then((c) => {
        init_words(
          res.data.map((w: any) => ({
            ...w,
            context: c.data.context,
          }))
        );
      });
    });
  }, []);

  const getContext = (w: any) => {
    api.post("get_context", { word_id: w.id }).then((res: any) => {
      return res.data.context;
    });
    return false;
  };
  return (
    <div>
      <ul className="dict">
        {words.map((w: any) => (
          <li>
            <div className="dict_word">
              الكلمة : <span className="fw-medium">{w.word}</span>{" "}
            </div>
            <div className="dict_word">
              الكلمة بلإنجليزية : <span className="fw-medium">{w.word_en}</span>{" "}
            </div>
            <div className="dict_word">
              الكلمة بالفرنسية : <span className="fw-medium">{w.word_fr}</span>{" "}
            </div>
            <div className="dict_context">
              <div>{w.context}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dict;
