import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const { category } = useParams(); // Get category from URL params
  const [selectedCategory, setSelectedCategory] = useState(category || '');

  useEffect(() => {
    setSelectedCategory(category || ''); // Update state when category changes
  }, [category]);

  return (
    <>
      <Header />
      <Navbar setCategory={setSelectedCategory} />
      <ProductList category={selectedCategory} />
    </>
  );
};

export default HomePage;
