import { makeApiRequest } from "./utils";

const baseURL = 'https://api.movies666.nomoredomainsicu.ru'

export function register({ password, email, name }) {
  return makeApiRequest(baseURL, "/signup", "POST", true, {
    password,
    email,
    name,
  });
}


export function authorize({ password, email }) {
  return makeApiRequest(baseURL, "/signin", "POST", true, {
    password,
    email,
  });
}

export function logout() {
  return makeApiRequest(baseURL, "/signout", "POST", true);
}

export function getUserInfo() {
  return makeApiRequest(baseURL, "/users/me", "GET", true);
}

export function updateUserInfo({ email, name }) {
  return makeApiRequest(baseURL, "/users/me", "PATCH", true, {
    email,
    name,
  });
}

export function getMyMovies() {
  return makeApiRequest(baseURL, "/movies", "GET", true);
}

export function createMovieCard({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
}) {
  return makeApiRequest(baseURL, "/movies", "POST", true, {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  });
}

export function deleteCard(movieId) {
  return makeApiRequest(baseURL, `/movies/${movieId}`, "DELETE", true);
}
