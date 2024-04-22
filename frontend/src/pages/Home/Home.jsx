import { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import AboutModal from "../../components/About-Us/aboutModal";

const Home = () => {
  const [category, setCategory] = useState(null);
  const [showAbout, setShowAbout] = useState(true);
  console.log(category);
  return (
    <div>
      {showAbout ? <AboutModal setShowAbout={setShowAbout} /> : <></>}
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
