import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner.js';
import MarvelError from '../error/MarvelError.js';

import './SingleComicPage.scss';


const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService()

    useEffect(()=> {
        updateComic();
    }, [comicId]);
    
    const updateComic = () => {     
        clearError();
        getComics(comicId)
            .then(setComic);
    }


    const errors = error? <MarvelError /> : null;
    const load = loading? <Spinner /> : null;
    const content = !error && !loading && comic? <View comic={comic}/>: null;

    return (
        <>
            {errors}
            {load}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, img, language, price} = comic;
    console.log(description)
    return (
        <>
            <div className="single-comic">
                <img src={img} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to=".." className="single-comic__back">Back to all</Link>
            </div>
        </>
    );
}

export default SingleComicPage;