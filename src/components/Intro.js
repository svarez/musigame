import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { QuizSelector } from '../utils/QuizConstructor';
import { UserContext } from '../utils/UserContext';

export const Intro = () => {


    const {favArtist, setFavArtist, setSelectedArtist} = useContext(UserContext);
    const history = useHistory();
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        setFavArtist(e.target.value)
        setError('')
    }

    let disabled = !favArtist ? true : false;

    const handleSubmit = (e) => {
        e.preventDefault()

        QuizSelector(favArtist).then(artists=> {

            if(artists.length > 0) {
                const selectedArtist = artists.reduce((acc, ele) => (parseInt(acc.listeners) > parseInt(ele.listeners)) ? acc : ele );
                setSelectedArtist(selectedArtist);
                history.replace('/musigame/quiz')
            } else {
                setError(`We couldn't find any title with the name of ${favArtist}`)
            }
        })
    }

    return (
        
        <div className="intro">
            <div className="description">
                <h1>Automatic quiz generator</h1>
                <p>In order for us to generate the quiz you must enter the name of your favorite band/artist:</p>
            </div>
            <div className="form">
                <form>
                    <div className="form__field">
                        <input 
                            type="text" 
                            className="form__field__input" 
                            autoComplete="off"
                            placeholder="Your favorite film" 
                            name="favFilm" 
                            id="favFilm" 
                            required 
                            value={ favArtist }
                            onChange={ handleInputChange }
                        />
                        <label 
                            htmlFor="favFilm"
                            className="form__field__label"
                            >
                                Your favorite band/artist
                        </label>
                    </div>
                    <button 
                        className="form__button"
                        disabled={disabled} 
                        onClick={ handleSubmit }
                        >
                            Send
                    </button>  
                </form>

                { error &&
                    (<div className="error-text">
                        { error }
                    </div>)
                }

            </div>
            
        </div>
    )
}
