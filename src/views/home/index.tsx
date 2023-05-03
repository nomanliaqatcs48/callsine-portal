import React from "react";
import Fourth from "./Fourth";
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
      <div style={{ height: 50 }} />
      <Fourth />
      <div style={{ height: 50 }} />
    </>
  );
};

export default Home;
