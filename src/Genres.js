import React from 'react';
import Movie from './Movie';

export default function Genres (props) {
  return(
    <div className="titleList">
      {props.movies.length === 0 ? "" :
        <div className="title">
          <h1>{props.name}</h1>
          <div className="titles-wrapper">
            {props.movies.map(m => (
              <Movie movie = {m} key = {m.id} 
                updateList ={props.updateList}
              />
            ))}
          </div>
        </div>
      }
    </div>
  )
}