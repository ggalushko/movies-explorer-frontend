import "./AboutMe.css";
import author from "../../images/me.jpg";
import SectionTitle from "../SectionTitle/SectionTitle";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {

  return (
    <section className="about-me">
      <SectionTitle title="Студент" />
      <article className="about-me__bio">
        <h3 className="about-me__name">Глеб</h3>
        <p className="about-me__profession">
          Фронтенд-разработчик, 23 года
        </p>
        <p className="about-me__text">
          Попробовав несколько направлений в IT, я решил, что душа лежит к фронтенд-разработке. Чтобы получать свои знания из разных источников и закреплять их на практике, я посткпил на курс "Веб-разраюотчик" от Яндекс Практикума.
        </p>
        <a
          className="about-me__link hover-link"
          href="https://github.com/ggalushko"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <img
          className="about-me__img"
          src={author}
          alt="Моя фотография"
        />
      </article>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
