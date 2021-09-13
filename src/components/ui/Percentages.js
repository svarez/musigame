import React from 'react'

const styleWidth = (percent) => {
    return {
        width : percent + '%'
    }
}

export const Percentages = ({ correctAnswers, totalAnswers }) => {

    let percentCorrect = totalAnswers < 100 ? correctAnswers : Math.round((correctAnswers * 100)/totalAnswers)
    let percentWrong = totalAnswers < 100 ? (totalAnswers - correctAnswers) : 100 - percentCorrect


    return (
        <div className="statics">
            <h3>Correct answers : 
                <span className="statics__correct-answers"> { correctAnswers }</span> 
                <span className="statics__total-answers"> / { totalAnswers }</span>
            </h3>   
            <div className="percent">
                <div 
                    style={ 
                        styleWidth(percentCorrect) 
                    } 
                    className="percent__correct"
                ></div>
                <div 
                    style={ 
                        styleWidth(percentWrong) 
                    } 
                    className="percent__wrong"
                ></div>
            </div>
        </div>
    )
}
