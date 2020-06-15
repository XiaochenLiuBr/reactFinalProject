import React from 'react';
import Movie from './Movie';

export default function MyList(props) {
  return(
    <div className="titleList">
      <div className="title">
        <h1>My List</h1>
        <div className="titles-wrapper">
          {props.movies.map(m => (
            <Movie movie = {m} key = {m.id} 
              updateList ={props.updateList}
            />
          ))}
        </div>
      </div>
    </div>
  )
}