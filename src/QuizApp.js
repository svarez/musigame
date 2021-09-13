import React, { useState } from 'react'
import { AppRouter } from './routers/AppRouter'
import { UserContext } from './utils/UserContext'

export const QuizApp = () => {

    const [favArtist, setFavArtist] = useState('')
    const [selectedArtist, setSelectedArtist] = useState('')

    return (
        <UserContext.Provider value={{
            favArtist,
            setFavArtist,
            selectedArtist,
            setSelectedArtist
        }}>
            <AppRouter />
        </UserContext.Provider>
    )
}
