export const apiUrlsProvider = {

    apiKey: process.env.REACT_APP_API_KEY,
    baseUrlApi : 'https://ws.audioscrobbler.com/2.0/',
    methodArtistSearch: 'artist.search',
    methodGetSimilarArtist: 'artist.getsimilar',
    methodGetTopAlbums : 'artist.gettopalbums',
    methodGetInfoAlbum : 'album.getinfo',
    limit: 10,
    urlArtistSearch: function(artist) {
        return `${this.baseUrlApi}?method=${this.methodArtistSearch}&api_key=${this.apiKey}&artist=${formatStringURL(artist)}&format=json`
    },
    urlGetSimilarArtist: function(artist) {

        return `${this.baseUrlApi}?method=${this.methodGetSimilarArtist}&api_key=${this.apiKey}&artist=${formatStringURL(artist)}&limit=${this.limit}&format=json`
    },
    urlGetTopAlbums : function(id) {
        return `${this.baseUrlApi}?method=${this.methodGetTopAlbums}&api_key=${this.apiKey}&mbid=${id}&limit=${this.limit}&format=json`
    },
    urlGetTopAlbumsByName : function(artist) {
        return `${this.baseUrlApi}?method=${this.methodGetTopAlbums}&api_key=${this.apiKey}&artist=${formatStringURL(artist)}&limit=${this.limit}&format=json`
    },
    urlGetInfoAlbum : function(id) { 
        return `${this.baseUrlApi}?method=${this.methodGetInfoAlbum}&api_key=${this.apiKey}&mbid=${id}&format=json`
    },
    urlGetInfoAlbumByName : function(album,artist) { 
        return `${this.baseUrlApi}?method=${this.methodGetInfoAlbum}&api_key=${this.apiKey}&album=${formatStringURL(album)}&artist=${formatStringURL(artist)}&format=json`
    }

}

const formatStringURL = string => encodeURI(string.normalize('NFD').replace(/[\u00C0-\u00FF]/g, '').toLowerCase())