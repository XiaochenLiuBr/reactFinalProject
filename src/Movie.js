import React from 'react';

export default function movie(props) {
  return(
    <div className="movie">
      <img
        src={props.movie.poster_path}
        alt=""
      />
      <div className="overlay">
        <div className="title">{props.movie.title}</div>
        <div className="rating">{props.movie.vote_average}/10</div>
        <div className="plot">
          {props.movie.overview}
        </div>
        <div data-toggled={props.movie.my_list} className="listToggle" onClick={()=>props.updateList(props.movie)}>
          <div>
            <i className="fa fa-fw fa-plus"></i
            ><i className="fa fa-fw fa-check"></i>
          </div>
        </div>
      </div>
    </div>
  )
}