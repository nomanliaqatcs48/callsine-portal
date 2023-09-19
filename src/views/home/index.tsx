import Banner from "./Banner";
import Find from "./Find";
import Footer from "./Footer";
import TakeControl from "./TakeControl";
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
