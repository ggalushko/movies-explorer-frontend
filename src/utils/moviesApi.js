import { makeApiRequest } from "./utils";
import { MOVIES_API_URL } from "./constants";

export function getMovies() {
  return makeApiRequest(MOVIES_API_URL, "/beatfilm-movies", "GET");
}
