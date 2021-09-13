import React from 'react'
import { 
    BrowserRouter as Router, 
    Redirect, 
    Route, 
    Switch 
} from 'react-router-dom'

import { Intro } from '../components/Intro'
import { Quiz } from '../components/Quiz'
import { Header } from '../components/ui/Header'





export const AppRouter = () => {
    return (
        <Router>

            <div className="app-container">

                <Header />

                <div className="main-container">
                    <Switch>
                        <Route exact path="/musigame/intro" component={ Intro } />
                        <Route exact path="/musigame/quiz" component={ Quiz } />
                        
                        <Redirect to="/musigame/intro" />

                    </Switch>
                </div>

            </div>
            
        </Router>
    )
}
