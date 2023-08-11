import React from "react";
import Banner from "./Banner";
import Find from "./Find";
import Numbers from "./Numbers";
import Footer from "./Footer";
import TakeControl from "./TakeControl";
import Reviews from "./Reviews";
import { Helmet } from "react-helmet-async";
import FooterBlueBar from "./FooterBlueBar";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | CallSine</title>
      </Helmet>
      <Banner />
      <Find />
      <TakeControl />
      {/*<Numbers />*/}
      {/*<Reviews />*/}
      <Footer />
      <FooterBlueBar />
    </>
  );
};

export default Home;
