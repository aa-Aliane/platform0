import React, { useEffect, useState } from "react";
import { useWords } from "../hooks/wordsState";
import { api } from "../services/api";

const Dict = () => {
  const words = useWords((state: any) => state.words);
  const init_words = useWords((state: any) => state.init_words);

  // pagination
  const [ws, setWs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(10);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    api
      .get(`words/get_words_range/?start=${startIndex}&end=${endIndex}`)
      .then((res: any) => {
        const promises = res.data.map((w: any) => {
          return api
            .post("get_context/", { word_id: w.id })
            .then((contextRes: any) => {
              console.log(contextRes.data);

              return {
                ...w,
                context: contextRes.data.map((c: any) => c.context),
              };
            });
        });

        Promise.all(promises).then((ws) => {
          init_words(ws);
        });
      });
  }, [currentPage, itemsPerPage, pageSize]);

  useEffect(() => {
    api
      .get("words/")
      .then((res: any) => setTotalPages(Math.ceil(res.data.length / pageSize)));
  }, []);

  const handleClick = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (e: any) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const renderPageButtons = () => {
    let pageButtons = [];
    let startPage = 1;
    let endPage = totalPages > 10 ? 10 : totalPages;
    if (totalPages > 10 && currentPage > 6) {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - 9;
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      let classes = "pagination__btn";
      if (i === currentPage) {
        classes += " pagination__btn--current-page";
      }
      pageButtons.push(
        <button key={i} className={classes} onClick={() => handleClick(i)}>
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div>
      <ul className="dict">
        {words.map((w: any) => (
          <li className="dict__instance">
            <div className="dict_instance_word">
              الكلمة : <span className="fw-bold">{w.word}</span>{" "}
            </div>
            <div className="dict_instance_word">
              الكلمة بلإنجليزية : <span className="fw-medium">{w.word_en}</span>{" "}
            </div>
            <div className="dict_instance_word">
              الكلمة بالفرنسية : <span className="fw-medium">{w.word_fr}</span>{" "}
            </div>
            <div className="dict_instance_context">
              <div>{w.context}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">{renderPageButtons()}</div>
    </div>
  );
};

export default Dict;
