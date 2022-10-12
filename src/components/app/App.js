import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader.js";
import {MainPage, ComicsPage, NotFound, SingleComicPage} from '../pages/index.js'


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />}/>
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path='/comics/:comicId' element={<SingleComicPage />} />
                        <Route path='*' element={<NotFound />}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;