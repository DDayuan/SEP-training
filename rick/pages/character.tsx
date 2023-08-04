import React from "react";
import axios from "axios";
import pagination from "@/components/pagination";

export const getServerSideProps = async () => {
  const page = 1;
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = res.data;
};
