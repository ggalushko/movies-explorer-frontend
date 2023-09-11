import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { handleSavedStatus } from "../../utils/utils";

function MoviesCardList({
  cards,
  savedCards,
  cardsRenderParams,
  isCardsNotFound,
  onCardSave,
  onCardDelete,
  isLoading,
}) {
  const [cardsForRender, setCardsForRender] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies" && cards.length) {
      const result = cards.filter((card, index) => {
        return index < cardsRenderParams.total;
      });
      setCardsForRender(result);
    }
  }, [location.pathname, cards, cardsRenderParams]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCardsForRender(cards);
    }
  }, [location.pathname, cards]);


  function handleClickOnButtonMore() {
    const start = cardsForRender.length;
    const end = start + cardsRenderParams.more;
    const count = cards.length - start;
    if (count > 0) {
      const additionalCards = cards.slice(start, end);
      setCardsForRender([...cardsForRender, ...additionalCards]);
    }
  }

  return (
    <section className="movies-card-list">
      {!localStorage.getItem("searchQuery") && cards.length === 0 && null}
      {isLoading && cards.length === 0 && <Preloader />}
      {isCardsNotFound && (
        <p className="movies-card-list__info">Ничего не найдено</p>
      )}
      {cards.length !== 0 && !isCardsNotFound && (
        <>
          <ul
            className={`movies-card-list__list ${
              cardsForRender.length > 3
                ? "movies-card-list__list_space-evenly"
                : ""
            }`}
          >
            {cardsForRender.map((card) => (
              <MoviesCard
                card={card}
                key={card.id || card._id}
                isSaved={handleSavedStatus(savedCards, card)}
                onCardSave={onCardSave}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
          {cardsForRender.length >= 5 &&
            cardsForRender.length < cards.length && (
              <button
                className="movies-card-list__btn-more hover-button"
                type="button"
                onClick={handleClickOnButtonMore}
              >
                Ещё
              </button>
            )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
