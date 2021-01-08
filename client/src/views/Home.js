import React, { useEffect, useState } from "react";
import { getCategories } from "../api/category";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {categories.map((c) => (
        <p>{c.name}</p>
      ))}
    </div>
  );
};

export default Home;
