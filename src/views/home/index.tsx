import React from "react";
import Fifth from "./Fifth";
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

      <Third />

      <Fourth />

      <Fifth />
    </>
  );
};

export default Home;
