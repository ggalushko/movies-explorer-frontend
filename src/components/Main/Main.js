import "./Main.css";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";

function Main({ aboutRef }) {
  return (
    <main className="main">
      <Promo aboutRef={aboutRef} />
      <AboutProject aboutRef={aboutRef} />
      <Techs />
      <AboutMe />
    </main>
  );
}

export default Main;