import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner.js';
import MarvelError from '../error/MarvelError.js';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) =>{
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(()=> {
        updateChar();
    }, [props.charId]);
    
    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        };
        
        clearError();
        getCharacter(charId)
            .then(setChar);
    }

    const skeleton = (!char && !loading && !error)? <Skeleton/>: null 
    const errorMes = error? <MarvelError/>: null;
    const load = loading ? <Spinner/>: null;
    const content = (!error && !loading && char)?  <View char={char}/>: null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMes}
            {load}
            {content}
        </div>
    )
}

const View = (props) => {
    const {name, img, homepage, wiki, description, comics} = props.char;

    const comicsV = (comic) => {
        const arr = comic.map((e,i) => {
            return (
                <li className="char__comics-item" key={i}>
                    <Link to={`/comics/${e.resourceURI.replace('http://gateway.marvel.com/v1/public/comics/','')}`}>{e.name}</Link>
                </li>
            )
        })
        return (
            <>
                {arr}
            </>
        )
    }
    const arr1 = comicsV(comics)
    let stl;
    img === undefined? stl = {}: stl = (img.includes('image_not_available.jpg') ? {objectFit: "contain"} : {objectFit: "cover"});
    return (
        <>
            <div className="char__basics">
                <img src={img} style={stl} alt={name}/>
                    <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                        </a>
                            <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
            {(description === undefined || description === '')?  'Not Found': 
                            description.length > 150? `${description.slice(0,200)}...`: description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    arr1.props.children.length === 0? 'There is no comics with this character': arr1.props.children.slice(0,10)
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}


export default CharInfo;