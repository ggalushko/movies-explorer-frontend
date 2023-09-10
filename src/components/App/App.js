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
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as mainApi from "../../utils/mainApi";
import * as moviesApi from "../../utils/moviesApi";
import { MOVIES_API_URL } from "../../utils/constants";

function App() {
  const [savedMovies, setsavedMovies] = useState([]);
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
          message: "Профиль обновлён",
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
        handleSignIn({ email, password });
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

  async function handleSignIn({ email, password }) {
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
        setsavedMovies([]);
        setCurrentUser({});
        localStorage.clear();
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleGetMovies() {
    setLoading(true);
    try {
      const moviesData = await moviesApi.getMovies();
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
      const moviesData = await mainApi.getMyMovies();
      if (moviesData) {
        setsavedMovies(moviesData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  async function handleSaveMovie(movie) {
    try {
      const newMovie = await mainApi.createMovieCard({
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
      if (newMovie) {
        setsavedMovies([newMovie, ...savedMovies]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleCheckLogin = useCallback(async () => {
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
    const movieToDelete = savedMovies.find(
      (card) => card.movieId === movie.id || card.movieId === movie.movieId
    );
    try {
      const data = await mainApi.deleteCard(movieToDelete._id);
      if (data) {
        setsavedMovies((state) =>
          state.filter((card) => card._id !== movieToDelete._id)
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
    handleCheckLogin();
  }, [loggedIn, handleCheckLogin]);

  useEffect(() => {
    if (loggedIn) {
      handleSavedMovies();
    }
  }, [loggedIn, handleSavedMovies]);

  function handleOpenSlider() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  function handleCloseSlider() {
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
                  loggedIn={loggedIn}
                  onHamburgerClick={handleOpenSlider}
                />
              }
            >
              <Route index element={<Main aboutRef={aboutOnClickRef} />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    onSearch={handleGetMovies}
                    onCardSave={handleSaveMovie}
                    onCardDelete={handleDeleteMovie}
                    savedMovies={savedMovies}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    onCardDelete={handleDeleteMovie}
                    loggedIn={loggedIn}
                    savedMovies={savedMovies}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    onLoading={isLoading}
                    loggedIn={loggedIn}
                    onUpdateUser={handleUpdateInfo}
                    onLogout={handleLogOut}
                  />
                }
              />
            </Route>
            <Route
              path="/signin"
              element={
                <Login
                  onLoading={isLoading}
                  loggedIn={loggedIn}
                  onLogin={handleSignIn}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onLoading={isLoading}
                  loggedIn={loggedIn}
                  onRegister={handleSignUp}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <HamburgerMenu
            onClose={handleCloseSlider}
            isSideMenuOpen={isSideMenuOpen}
          />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
