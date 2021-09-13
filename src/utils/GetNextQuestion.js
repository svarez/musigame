import { getSimilarArtist } from "../api/ApiSelector"
import { getRandomElements } from "./getRandomElement";

export const GetNextQuestion = async(name) => {
    const {similarartists : { artist }} = await getSimilarArtist(name);
    return getRandomElements(artist, 1)[0];
}