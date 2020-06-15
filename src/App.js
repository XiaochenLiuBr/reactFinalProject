import React from 'react';
import * as MovieAPI from './MovieAPI';
import Genres from './Genres';
import MyList from './MyList';
import { Switch, Link, Route} from 'react-router-dom';

class App extends React.Component {
  state = {
    query: "",
    results: [],
    movies: [],
    genres: [],
  }

  componentDidMount = () => {
    MovieAPI.getAll()
    .then(movies => {
      this.setState({movies})
    })

    MovieAPI.genres()
    .then(genres => {
      genres.sort(function(a,b) {
        if(a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        };
      })
      this.setState({genres});
    })
  }

  updateList = movie => {
    if(!movie.my_list) {
      MovieAPI.addToList(movie)
      .then(movie => {
        this.updateMyMovie(movie);
      })
    } else if(movie.my_list) {
      MovieAPI.removeFromList(movie)
      .then(movie => {
        this.updateMyMovie(movie);
      })
    }
  }

  updateMyMovie = movie => {
    this.setState(prevState => {
      const movieIndex = prevState.movies.findIndex(movieEle => movie.id === movieEle.id);
      const clonedState = [...prevState.movies];
      clonedState.splice(movieIndex, 1, movie);
      return {movies: clonedState};
    })
  }

  updateQuery = e => {
    this.setState({query: e.target.value});
    this.setState({results: this.state.movies.filter (
      movie => movie.title.toLowerCase().includes(this.state.query) || movie.overview.toLowerCase().includes(this.state.query)
    )} )
  }

  render = () => {
    return (
      <>
        <header className="header">
          <Link to="/">
            <img
              src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
              alt="netflix-font"
              border="0"
            />
          </Link>
          <div id="navigation" className="navigation">
            <nav>
              <ul>
                <li><Link to="/myList">My List</Link></li>
              </ul>
            </nav>
          </div>
          <form id="search" className="search">
            <input type="search" placeholder="Search for a title..." onChange={this.updateQuery} value={this.state.query}/>
            <div className="searchResults">
            {this.state.query === "" ? "" : (`Found ${this.state.results.length} movies with the query "${this.state.query}"`)}
            </div>
          </form>
        </header>
        
        <Switch>
          <Route exact path="/">
            {this.state.genres.map(genre => (
              <Genres 
                name = {genre.name} 
                movies = {this.state.query === "" ? 
                          this.state.movies.filter(movie => movie.genre_ids.includes(genre.id)):
                          this.state.results.filter(movie => movie.genre_ids.includes(genre.id))}
                key = {genre.id}
                updateList = {this.updateList}
              />
              ))
            }
          </Route>

          <Route exact path="/mylist">
              <MyList 
                movies = {this.state.movies.filter(movie => movie.my_list === true)}
                updateList = {this.updateList}
              />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;