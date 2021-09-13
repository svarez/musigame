import { Api } from './Api'
import { apiUrlsProvider } from './ApiUrlsProvider'

export const searchByArtistName = (artist) => Api(apiUrlsProvider.urlArtistSearch(artist));
export const getSimilarArtist = (artist) => Api(apiUrlsProvider.urlGetSimilarArtist(artist));
export const getTopAlbums = (id) => Api(apiUrlsProvider.urlGetTopAlbums(id));
export const getTopAlbumsByName = (name) => Api(apiUrlsProvider.urlGetTopAlbumsByName(name));
export const getInfoAlbum = (id) => Api(apiUrlsProvider.urlGetInfoAlbum(id));
export const getInfoAlbumByName = (album, artist) => Api(apiUrlsProvider.urlGetInfoAlbumByName(album, artist));


