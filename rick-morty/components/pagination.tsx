import React, { ReactHTMLElement } from "react";
import styles from "./pagination.module.css";

interface Props {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPage, onPageChange }: Props) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newPage = +e.currentTarget.value;
    onPageChange(newPage);
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

  return (
    <div className={styles["pagination"]}>
      <button className={styles["button"]} onClick={handlePrev}>
        Prev
      </button>
      {pageNumbers.map((num, index) =>
        typeof num === "string" ? (
          <span className={styles["span"]} key={index + num}>
            ...
          </span>
        ) : (
          <button
            className={currentPage === num ? styles["active-button"] : styles["button"]}
            key={num}
            value={num}
            onClick={handlePage}
          >
            {num}
          </button>
        )
      )}
      <button className={styles["button"]} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
