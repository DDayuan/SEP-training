import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { setPage } from "./redux/searchPageSlice";

const Pagination = () => {
  const currentPage = useSelector<RootState, number>(
    (state) => state.searchPage.page
  );

  const totalPage = useSelector<RootState, number>(
    (state) => state.searchPage.totalPages
  );

  console.log(currentPage, totalPage, "useSelector hooks");

  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(setPage(currentPage - 1));
  };

  const handleNext = () => {
    dispatch(setPage(currentPage + 1));
  };

  const handlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newPage = +e.currentTarget.value;
    console.log(newPage, e.currentTarget.value);
    dispatch(setPage(newPage));
  };

  const pageNumbers: (number | string)[] = [];

  if (totalPage <= 7) {
    for (let i = 1; i <= 7; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) {
      pageNumbers.push("...");
    }
    let leftSideNumber = currentPage - 1 > 1 ? currentPage - 1 : 2;
    let rightSideNumber =
      currentPage + 1 < totalPage ? currentPage + 1 : totalPage - 1;
    for (let i = leftSideNumber; i <= rightSideNumber; i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPage - 2) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPage);
  }
  console.log(pageNumbers);

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        prev
      </button>
      {pageNumbers.map((num, index) =>
        typeof num === "string" ? (
          <span key={index + num}>...</span>
        ) : (
          <button
            key={num}
            value={num}
            onClick={handlePage}
            className={currentPage === num ? "active" : ""}
          >
            {num}
          </button>
        )
      )}
      <button onClick={handleNext} disabled={currentPage === totalPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
