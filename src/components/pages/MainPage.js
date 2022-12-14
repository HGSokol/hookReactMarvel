import { useState } from "react";

import RandomChar from "../randomChar/RandomChar.js";
import CharList from "../charList/CharList.js";
import CharInfo from "../charInfo/CharInfo.js";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.js";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null)

    const stateLift = (id) => {
        setSelectedChar(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar stateLift={stateLift}/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList stateLift={stateLift}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;