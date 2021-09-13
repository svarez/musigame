import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { GetNextQuestion } from '../utils/GetNextQuestion';
import { quizConstructor } from '../utils/QuizConstructor'
import { UserContext } from '../utils/UserContext';
import { Percentages } from './ui/Percentages';

export const Quiz = () => {

    
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [totalAnswers, setTotalAnswers] = useState(0)
    const { selectedArtist } = useContext(UserContext);
 
    const radioRef = useRef([])

    const history = useHistory();
    (!selectedArtist && history.replace('./intro'))

    const [quiz, setQuiz] = useState({
        title : '',
        answers: [],
        correctAnswer: '',
        loading : true
    })

    useEffect(() => {

        selectedArtist && (quizConstructor(selectedArtist).then(q=>{
            setQuiz(q)
        })
        )
        //selectedArtist && (setQuiz(quizConstructor(selectedArtist)))

    }, [selectedArtist]);

    const handleChange = (e) => {

        setTotalAnswers( totalAnswers + 1 )

        if(quiz.correctAnswer === e.target.value) {
            setCorrectAnswers( correctAnswers + 1 )
            radioRef.current[e.target.value].classList.add("correct-answer");
        } else {
            radioRef.current[quiz.correctAnswer].classList.add("correct-answer");
            radioRef.current[e.target.value].classList.add("wrong-answer");
        }

        setTimeout(()=>{
    
            setQuiz({
                title : '',
                answers: [],
                correctAnswer: '',
                loading: true
            })
    
            GetNextQuestion(selectedArtist.name).then(artist=>{
                quizConstructor(artist).then(a=>{
                    setQuiz(a)
                })
            })


        }, 1500);
    }

    return (
        <div className="quiz">
            <div className="question">

                <div className="fav-movie">
                    <h2>You chose {selectedArtist.name}</h2>
                </div>

                <Percentages 
                    correctAnswers={ correctAnswers }
                    totalAnswers={ totalAnswers }
                />
                    <div className="question__title">
                        <h1>{ quiz.title }</h1>
                    </div><div className="question__answers">
                        {
                            Object.keys(quiz.answers).map(id=>
                                <label 
                                    ref={el => radioRef.current[id] = el} 
                                    className="radio radio-gradient" 
                                    key={quiz.answers[id]}
                                >
                                    <span className="radio__input">
                                        <input
                                            name='answer'
                                            type="radio"
                                            value={id}
                                            onChange={ handleChange }
                                        /> 
                                    <span className="radio__control"></span>
                                    </span>
                                    <span className="radio__label">{quiz.answers[id]}</span>
                                </label>
                            )
                        }
                    </div>
                
                

                {(quiz.loading) && 
                <div>
                    Loading...
                </div>
                }    

            </div>
            
        </div>
    )
}
