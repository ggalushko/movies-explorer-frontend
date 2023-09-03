import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ card, isLiked, onCardLike }) {
  const location = useLocation();

  function handleConvertDuration(duration) {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <li className="movies-card">
      <div className="movies-card__caption">
        <p className="movies-card__name">{card.nameRU}</p>
        <p className="movies-card__duration">
          {handleConvertDuration(card.duration)}
        </p>
      </div>
      <img
        className="movies-card__img"
        src={card.image}
        alt={"Кадр из фильма"}
      />
      {location.pathname === "/movies" ? (
        <button
          className={`movies-card__btn-action movies-card__btn-action_save hover-button ${
            isLiked
              ? "movies-card__btn-action_saved"
              : "movies-card__btn-action_save"
          }`}
          type="button"
          onClick={onCardLike}
        />
      ) : (
        <button
          className="movies-card__btn-action movies-card__btn-action_delete"
          type="button"
        />
      )}
    </li>
  );
}

export default MoviesCard;
