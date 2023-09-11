import { makeRequest } from "./utils";
import { MOVIES_API_URL } from "./constants";

export function getCards() {
  return makeRequest(MOVIES_API_URL, "/beatfilm-movies", "GET");
}
