import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import MarverlError from '../error/MarvelError'
import CharInfo from '../charInfo/CharInfo';

import './charList.scss';

const CharList = (props)=> {

    const [item, setItem] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(404);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters, clearError} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true);
    }, []);
   
    const onRequest = (offset, initial) => {    
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllCharacters(offset)
            .then(getNewState);
    };

    const getNewState = (newCharlist) => {
        let ended = false;
        if( newCharlist.length < 9 ){
            ended = true;
        };

        setItem([...item,...newCharlist]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    };

    const getAllCards = (item) =>{
        const all = item.map(e =>{
           return(
                <li className="char__item"  key={e.id} onClick={() => props.stateLift(e.id)}>
                    <img src={e.img} alt="abyss"/>
                    <div className="char__name">{e.name}</div>
                </li>
           )
        })

        return (
            <ul className="char__grid">
                {all}
            </ul>
        )
    };
    
    const allItems = getAllCards(item);
    const load = loading && !newItemLoading ? <Spinner /> : null;
    const errors = error? <MarverlError/>: null;

    return (
        <div className="char__list">
            <ul className="char__grid" >
                {load}
                {errors}
                {allItems}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charEnded? "none": "block"}}
                onClick={() => onRequest(offset)}>
                    <div className="inner" >load more</div>
            </button>
        </div>
    );
};

// test types
CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharList;