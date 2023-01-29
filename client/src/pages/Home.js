import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import hero from '../assets/hero.png';

const Home = () => {
  return (
    <div className="container">
      <img src={hero} alt="hero" />
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
