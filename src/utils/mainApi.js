import { makeRequest } from "./utils";

const baseURL = 'https://api.movies666.nomoredomainsicu.ru'

export function register({ password, email, name }) {
  return makeRequest(baseURL, "/signup", "POST", true, {
    password,
    email,
    name,
  });
}


export function authorize({ password, email }) {
  return makeRequest(baseURL, "/signin", "POST", true, {
    password,
    email,
  });
}

export function logout() {
  return makeRequest(baseURL, "/signout", "POST", true);
}

export function getUserInfo() {
  return makeRequest(baseURL, "/users/me", "GET", true);
}

export function updateUserInfo({ email, name }) {
  return makeRequest(baseURL, "/users/me", "PATCH", true, {
    email,
    name,
  });
}

export function getCardsByOwner() {
  return makeRequest(baseURL, "/movies", "GET", true);
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
  return makeRequest(baseURL, "/movies", "POST", true, {
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
  return makeRequest(baseURL, `/movies/${movieId}`, "DELETE", true);
}
