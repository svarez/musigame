import { getInfoAlbum, getInfoAlbumByName, getSimilarArtist, getTopAlbums, getTopAlbumsByName, searchByArtistName } from "../api/ApiSelector"
import { getRandomElements } from "./getRandomElement";
import { getRangeOfYears } from "./getRangeOfYears";

export const QuizSelector = async (favArtist) => {

    const { results } = await searchByArtistName(favArtist);

    return results?.artistmatches?.artist;

}
export const quizConstructor = (artist) => {

    return getQuestion(artist).then(question=>question);

}
const getQuestion = (artist) => {
    

    const randomNumber = Math.floor(Math.random() * 3);
          
    switch (randomNumber) {
        case 0:
            return whatYear(artist)

        case 1:
            return whoRecorded(artist)

        case 2:
            return wichSong(artist)

        case 3:
            return wichAlbum(artist)
    
        default:
            return whatYear(artist)
    }

}
const whatYear = async (artist) => {

    const selectedAlbum = await getRandomAlbums(artist)

    const albums = selectedAlbum.mbid 
        ? await getInfoAlbum(selectedAlbum.mbid)
        : await getInfoAlbumByName(selectedAlbum.name, selectedAlbum.artist.name)

    if(albums?.album?.wiki && getReleaseYear(albums?.album?.wiki)) {

        const {album : a} = albums
        const releaseYear = getReleaseYear(a.wiki)

        const date = parseInt(releaseYear).toString();
        const randomYears = getRangeOfYears(parseInt(date));

        const titleQuestion = `What year was release the album ${selectedAlbum.name} by ${selectedAlbum.artist.name}?`;
        const answers = [...getRandomElements(randomYears, 3), date].sort(() => Math.random() - 0.5);
        const correctAnswer = Object.keys(answers).find(key => answers[key] === date)
        
        const quiz = {
            title: titleQuestion,
            answers: answers,
            correctAnswer: correctAnswer
        }

        return quiz

    } else {

        return wichSong(artist)

    }


}
const whoRecorded = async (artist) => {

    const selectedAlbum = await getRandomAlbums(artist)
    const artistName = selectedAlbum.artist.name
    const {similarartists : { artist :simArtist }} = await getSimilarArtist(artistName)
    const randomArtists = getRandomElements(simArtist, 3).map((art)=>art.name)
    
    const titleQuestion = `Who recorded the album ${selectedAlbum.name}?`;
    const answers = [...getRandomElements(randomArtists, 3), artistName].sort(() => Math.random() - 0.5);
    const correctAnswer = Object.keys(answers).find(key => answers[key] === artistName)
    
    const quiz = {
        title: titleQuestion,
        answers: answers,
        correctAnswer: correctAnswer
    }

    return quiz

    
}
const wichSong = async (artist) => {

    const selectedAlbum = await getRandomAlbums(artist)
    const artistName = selectedAlbum.artist.name

    const albums = selectedAlbum.mbid 
        ? await getInfoAlbum(selectedAlbum.mbid)
        : await getInfoAlbumByName(selectedAlbum.name, selectedAlbum.artist.name)


    // Check if there is any track, if not send to who recorded question
    if(albums?.album?.tracks?.track?.length > 0) {
        const {album : {tracks}} = albums

        const songs = getRandomElements(tracks.track, 3).map((song)=>{
            return song.name
        })

        const {similarartists : { artist : simArtist }} = await getSimilarArtist(artistName)
    
        const randomArtist = getRandomElements(simArtist, 1)[0]
    
        const randomAlbum = await getRandomAlbums(randomArtist)
        
        const randomA = randomAlbum.mbid 
            ? await getInfoAlbum(randomAlbum.mbid)
            : await getInfoAlbumByName(randomAlbum.name, randomAlbum.artist.name)
    
        if(randomA?.album?.tracks?.track?.length > 0) {

            const {album : am} = randomA

            const randomSong = getRandomElements(am.tracks.track, 1)[0].name
    
            const titleQuestion = `Which of these songs wasn't recorded by ${artistName}?`;
            const answers = [...getRandomElements(songs, 3), randomSong].sort(() => Math.random() - 0.5);
            const correctAnswer = Object.keys(answers).find(key => answers[key] === randomSong)
            
            const quiz = {
                title: titleQuestion,
                answers: answers,
                correctAnswer: correctAnswer
            }
        
            return quiz

        } else {

            return whoRecorded(artist)

        }

    } else {
        return whoRecorded(artist)
    }


}

const wichAlbum = async (artist) => {

    const selectedAlbums = await getRandomAlbums(artist, 3)
    
    if(selectedAlbums[0]?.artist?.name) {

        const artistName = selectedAlbums[0].artist.name
        const albums = selectedAlbums.map(album=>album.name)
    
        const {similarartists : { artist :simArtist }} = await getSimilarArtist(artistName)
        const randomArtist = getRandomElements(simArtist, 1)[0]

        const randomAlb = await getRandomAlbums(randomArtist)
        if(randomAlb) {
            const { name : randomAlbum } = randomAlb
        
            const titleQuestion = `Which of these albums wasn't recorded by ${artistName}?`;
            const answers = [...albums, randomAlbum].sort(() => Math.random() - 0.5);
            const correctAnswer = Object.keys(answers).find(key => answers[key] === randomAlbum)
            
            const quiz = {
                title: titleQuestion,
                answers: answers,
                correctAnswer: correctAnswer
            }
        
            return quiz

        } else {

            return whoRecorded(artist)

        }


    } else  {

        return whoRecorded(artist)

    }
    

}




const getReleaseYear = (wiki) => {

    let releaseYear = '';
        const yearRegex = /(\d\d\d\d)/;
        const matches = wiki.content.match('released');
        const splitMatches = matches ? wiki.content.split('released') : null;

        (splitMatches && splitMatches[1] && splitMatches[1].match(yearRegex)) && (releaseYear = splitMatches[1].match(yearRegex)[0])
        
    return releaseYear;

}
const getRandomAlbums = async (artist, n=1) => {


    if(artist?.name) {

        const { mbid, name } = artist

        const albums = mbid 
                ? await getTopAlbums(mbid) 
                : await getTopAlbumsByName(name)

        if(albums?.topalbums?.album?.length > 0) {

            const { topalbums : { album } } = albums 

            const formAlbum = album.filter(({name}) => 
            !name.includes('Essential') &&
            !name.includes('Best') &&
            !name.includes('Anniversary') &&
            !name.includes('Collection') &&
            !name.includes('Hits') &&
            !name.includes('Greatest') &&
            !name.includes('Deluxe') &&
            !name.includes('null') &&         
            !name.includes('Number Ones')  &&           
            !name.includes('Anthology')  &&           
            !name.includes('Singles')  &&           
            !name.includes('History')  &&           
            !name.includes('Remaster')  &&           
            !name.includes('Mix')         
            )

            return n === 1 ? getRandomElements(formAlbum, 1)[0] : getRandomElements(formAlbum, n)

        } else {
            
            return whoRecorded(artist)

        }


    }     

}