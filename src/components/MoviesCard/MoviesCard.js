// IMPORT PACKAGES
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { convertDuration } from "../../utils/utils";
import { MOVIES_API_URL } from "../../utils/constants";

function MoviesCard({ card, isSaved, onCardSave, onCardDelete }) {
  // HOOKS
  const location = useLocation();

  // HANDLER SAVE CLICK
  function handleSaveClick() {
    onCardSave(card);
  }

  // HANDLER DELETE CLICK
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__caption">
        <p className="movies-card__name">{card.nameRU}</p>
        <p className="movies-card__duration">
          {convertDuration(card.duration)}
        </p>
      </div>
      <img
        className="movies-card__img"
        src={
          location.pathname === "/movies"
            ? `${MOVIES_API_URL}${card.image.url}`
            : `${card.image}`
        }
        alt={"Кадр из фильма"}
      />
      {location.pathname === "/movies" ? (
        <button
          className={`movies-card__btn-action movies-card__btn-action_save hover-button ${
            isSaved
              ? "movies-card__btn-action_saved"
              : "movies-card__btn-action_save"
          }`}
          type="button"
          onClick={isSaved ? handleDeleteClick : handleSaveClick}
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
