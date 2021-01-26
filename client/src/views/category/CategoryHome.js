import React, { useState, useEffect } from "react";
import { getCategory } from "../../api/category";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components";

const CategoryHome = () => {
  const { slug } = useParams();

  return (
    <div>
      <p>{slug}</p>
    </div>
  );
};

export default CategoryHome;
