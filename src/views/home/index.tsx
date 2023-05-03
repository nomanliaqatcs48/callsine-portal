import React from "react";
import Hero from "./Hero";
import Second from "./Second";
import Third from "./Third";

const Home = () => {
  return (
    <>
      <Hero />
      <div style={{ height: 50 }} />
      <Second />
      <div style={{ height: 50 }} />
      <Third />
    </>
  );
};

export default Home;
