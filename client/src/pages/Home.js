import React from "react";
import PetList from "../components/PetList";
import PetTypeMenu from "../components/PetTypeMenu";
import Booked from "../components/Booked";
import hero from '../assets/hero.png';

const Home = () => {
  return (
    <div className="container">
      <img src={hero} alt="hero" />
      <PetTypeMenu />
      <PetList />
      <Booked />
    </div>
  );
};

export default Home;
