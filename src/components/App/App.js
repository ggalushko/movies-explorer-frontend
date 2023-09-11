import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import "./App.css";
import AppLayout from "../AppLayout/AppLayout";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Registr from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as mainApi from "../../utils/mainApi";
import * as moviesApi from "../../utils/moviesApi";
import { MOVIES_API_URL } from "../../utils/constants";


function App() {
  const [savedCards, setSavedCards] = useState([]);
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloaderActive, setPreloaderClass] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const aboutOnClickRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useNotification();

  async function handleUpdateInfo({ email, name }) {
    setLoading(true);
    try {
      const userData = await mainApi.updateUserInfo({ email, name });
      if (userData) {
        setCurrentUser(userData);
        dispatch({
          type: "SUCCESS",
          title: "Выполнено",
          message: "Профиль успешно обновлён",
        });
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `${err}`,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp({ password, email, name }) {
    setLoading(true);
    try {
      const userData = await mainApi.register({ password, email, name });
      if (userData) {
        handleLogIn({ email, password });
        navigate("/movies", { replace: true });
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `${err}`,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogIn({ email, password }) {
    setLoading(true);
    try {
      const userData = await mainApi.authorize({ email, password });
      if (userData) {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `${err}`,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogOut() {
    try {
      const data = await mainApi.logout();
      if (data) {
        setLoggedIn(false);
        setCurrentUser({});
        setSavedCards([]);
        localStorage.clear();
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  
  async function handleMovies() {
    setLoading(true);
    try {
      const moviesData = await moviesApi.getCards();
      if (moviesData) {
        return moviesData;
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `Во время запроса произошла ошибка`,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSavedMovies = useCallback(async () => {
    try {
      const moviesData = await mainApi.getCardsByOwner();
      if (moviesData) {
        setSavedCards(moviesData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  async function handleSaveMovie(movie) {
    try {
      const movieData = await mainApi.createMovieCard({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_API_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      if (movieData) {
        setSavedCards([movieData, ...savedCards]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleLoginCheck = useCallback(async () => {
    try {
      const userData = await mainApi.getUserInfo();
      if (userData) {
        setLoggedIn(true);
        setCurrentUser(userData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPreloaderClass(false);
    }
  }, []);


  async function handleDeleteMovie(movie) {
    const savedMovie = savedCards.find(
      (card) => card.movieId === movie.id || card.movieId === movie.movieId
    );
    try {
      const data = await mainApi.deleteCard(savedMovie._id);
      if (data) {
        setSavedCards((state) =>
          state.filter((card) => card._id !== savedMovie._id)
        );
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `${err}`,
      });
      console.error(err);
    }
  }

  useEffect(() => {
    handleLoginCheck();
  }, [loggedIn, handleLoginCheck]);

  useEffect(() => {
    if (loggedIn) {
      handleSavedMovies();
    }
  }, [loggedIn, handleSavedMovies]);

  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  function handleCloseSideMenu() {
    setSideMenuStatus(false);
  }

  return (
    <div className="app__content">
      {isPreloaderActive ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout
                  onHamburgerClick={handleOpenSideMenu}
                  loggedIn={loggedIn}
                />
              }
            >
              <Route index element={<Main aboutRef={aboutOnClickRef} />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    savedCards={savedCards}
                    onSearch={handleMovies}
                    onCardSave={handleSaveMovie}
                    onCardDelete={handleDeleteMovie}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    savedCards={savedCards}
                    onCardDelete={handleDeleteMovie}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    onUpdateUser={handleUpdateInfo}
                    onLogout={handleLogOut}
                    onLoading={isLoading}
                    loggedIn={loggedIn}
                  />
                }
              />
            </Route>
            <Route
              path="/signin"
              element={
                <Login
                  onLogin={handleLogIn}
                  onLoading={isLoading}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Registr
                  onRegistr={handleSignUp}
                  onLoading={isLoading}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <HamburgerMenu
            isSideMenuOpen={isSideMenuOpen}
            onClose={handleCloseSideMenu}
          />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
