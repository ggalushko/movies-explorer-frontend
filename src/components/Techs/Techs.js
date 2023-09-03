import "./Techs.css";
import SectionTitle from "../SectionTitle/SectionTitle";
const techonologies = [
  "HTML",
  "CSS",
  "JS",
  "React",
  "Git",
  "Express.js",
  "mongoDB",
];

function Techs() {
  return (
    <section className="techs">
      <SectionTitle title="Технологии" />
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__text">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили в&nbsp;дипломном проекте.
      </p>
      <ul className="techs__list">
        {techonologies.map((tech) => {
          return (
            <li className="techs__list-item" key={tech}>
              <p className="techs__list-item-text">{tech}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Techs;
