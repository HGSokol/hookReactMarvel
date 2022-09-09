import {useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService.js';
import Spinner from '../spinner/Spinner.js';
import MarvelError from '../error/MarvelError.js';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = (props) => {
    const [char,setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        getRandomCharacter()
        const timerId = setInterval(getRandomCharacter, 60000);

        return () => {
            clearInterval(timerId)
        }
    }, [])
    
    const getRandomCharacter = () => {
        clearError();
        const id = Math.floor(Math.random()*(1011400 - 1011000) + 1011000);
        
        getCharacter(id)
            .then(setChar)
    }  


    let errorMes = error? <MarvelError/>: null;
    let load = loading? <Spinner/>: null;
    let content = !error && !loading?  <View char={char} func={props}/>: null;
    
    return (
        <div className="randomchar">
            {/* условный рендеринг */ }
            {errorMes}
            {load}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner"
                        onClick={getRandomCharacter}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

// простой рендарящий компонент
const View = (props) => {
    const {img , name, description, homepage, wiki, id} = props.char;

    const onClLoad = (id) => {
        props.func.stateLift(id)
    }
    let stl;
    img === undefined? stl = {}: stl = (img.includes('image_not_available.jpg') ? {objectFit: "contain"} : {objectFit: "cover"});
    return (
            <div className="randomchar__block" >
                <img 
                    src={img} 
                    style={stl}
                    alt="Random character" className="randomchar__img"
                    onClick={() => onClLoad(id)}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {(description === undefined || description === '')?  'Not Found': 
                            description.length > 150? `${description.slice(0,200)}...`: description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
}

export default RandomChar;