import React, { Fragment, useState } from "react";
import axios from "axios";
import { InferGetServerSidePropsType } from "next";
import Pagination from "@/components/pagination";
import styles from "../styles/characters.module.css";

interface character {
  name: string;
  image: string;
}

interface Props {
  characters: character[];
  pages: number;
}

export const getServerSideProps = async () => {
  const page = 1; // Set initial page
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = res.data;

  return {
    props: {
      characters: data.results,
      pages: data.info.pages,
    },
  };
};

const Card: React.FC<character> = ({ name, image }) => (
  <div className={styles["card"]}>
    <img src={image} alt={name} />
    <p>{name}</p>
  </div>
);

const Characters = ({ characters: initialCharacters, pages }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState(initialCharacters);

  const handlePageChange = async (page: number) => {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    console.log(res);
    const data = res.data;

    setCharacters(data.results);
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <h1 className={styles["header"]}>Rick and Morty Characters</h1>
      <div className={styles["card-container"]}>
        {characters.map((character) => (
          <Card
            key={character.name}
            name={character.name}
            image={character.image}
          />
        ))}
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPage={pages}
        onPageChange={handlePageChange}
      />
    </Fragment>
  );
};

export default Characters;
