import React from 'react';
import './play.css';
import Idset from './imdbIds'

const API_KEY = "20a57fb1"
const first_movie = retreiveMovie("the shawshank redemption")
const last_movie = retreiveMovie("the godfather")
const score = 0

class Movie {
  constructor(title, director, actors, year, id, poster) {
    this.title = title;
    this.director = director;
    this.actors = actors;
    this.year = year;
    this.id = id;
    this.poster = poster
  }
}

async function retreiveMovie(guess) {
    const apiTitle = encodeURIComponent(guess.trim().toLowerCase());
    const result = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${apiTitle}`);
    const data = await result.json();
    if (data.Response === 'False')
        return null;
    return new Movie(data.Title, data.Director, data.Actors, data.Year, data.imdbID, data.Poster)
}

export function Play() {
    const [guesses, setGuesses] = React.useState([]);
    const [error, setError] = React.useState('');

    async function onPressed(e) {
        e.preventDefault();                                 
        const guess = e.target.elements[0].value;           
        if (!guess.trim()) return;

        try {
            const movie = await retreiveMovie(guess);
            if (!movie) {
                setError(`Couldn't find "${guess}"`);
                return;
            }
            setError('');
            setGuesses(prev => [...prev, movie]);              
            e.target.reset();                                
        } 
        catch {
            setError('Network error, try again.');
        }
        const previous_film = Movie;
        const current_film = guesses[guesses.length-1];
        Idset.push(current_film);
        if (guesses.length == 1){
            previous_film = first_movie;
        }
        else{
            previous_film = guesses[guesses.length - 2];
        }
        if(current_film.title == previous_film.title)
            setError('Invalid selection');
        
        if(current_film.director == previous_film.director)
            score += 20;
        
        if(current_film.actors == previous_film.actors)
            score += 40;
        
        if(current_film.year == previous_film.year)
            score += 10;
        
        else
            setError('Invalid selection');
        
         
    }

    return (
        <main>
            <div className="scoresheet">
                <div className="players">
                    Player:
                    <span className="player-name">  Movie guy</span>
                </div>
                <div>
                    <label for="count">Score</label>
                    <input type="text" id="count" value="--" readonly />
                </div>
                <div>
                    <label for="count">HighScore</label>
                    <input type="text" id="count" value="900" readonly />
                </div>
            </div>

            <br />
            <br />

            <div className="movies">
            <div className="start-poster">
                <img className="start" alt="Poster1"
                src={first_movie.poster}/>
                <div className="movie-info">
                <div className="movie-title">
                    <p> {first_movie.title} </p>
                </div>
                <div className="movie-stats">
                    <p>{first_movie.year}</p>
                    <p>{first_movie.actors}</p>
                    <p>{first_movie.director}</p>
                </div>
                </div>
            </div>
            <img className="arrow" alt="arrow1" src="arrow.svg" />
            <div className="end-poster">
                <img className="end" alt="Poster 2"
                src={last_movie.poster} />
                <div className="movie-info">
                <div className="movie-title">
                    <p> {last_movie.title} </p>
                </div>
                <div className="movie-stats">
                    <p>{last_movie.year}</p>
                    <p>{last_movie.actors}</p>
                    <p>{last_movie.director}</p>
                </div>
                </div>
            </div>
            </div>

            <br />
            <br />

            <div className="guesses">
            <div className="selectors">
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess1">Guess ONE:</label>
                    <input type="text" className="form-control" id="guess1" placeholder="a minecraft movie"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess2">Guess TWO:</label>
                    <input type="text" className="form-control" id="guess2" placeholder="song sung blue"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess3">Guess THREE:</label>
                    <input type="text" className="form-control" id="guess3" placeholder="movie #3"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess4">Guess FOUR:</label>
                    <input type="text" className="form-control" id="guess4" placeholder="movie #4"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>  
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess5">Guess FIVE:</label>
                    <input type="text" className="form-control" id="guess5" placeholder="movie #5"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess6">Guess SIX:</label>
                    <input type="text" className="form-control" id="guess6" placeholder="movie #6"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess7">Guess SEVEN:</label>
                    <input type="text" className="form-control" id="guess7" placeholder="movie #7"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess8">Guess EIGHT:</label>
                    <input type="text" className="form-control" id="guess8" placeholder="movie #8"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess9">Guess NINE:</label>
                    <input type="text" className="form-control" id="guess9" placeholder="movie #9"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div>
                <form onSubmit={onPressed}>
                    <div className="form-group">
                    <label for="guess10">Guess TEN:</label>
                    <input type="text" className="form-control" id="guess10" placeholder="movie #10"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
            </div>
            <div className="information-2">
                <div className="movie-info">
                <div className="movie-title">
                        <p> A Minecraft Movie </p>
                    </div>
                    <div className="movie-stats">
                        <p>2025</p>
                        <p>Jason Momoa, Jack Black, Sebastian Hansen</p>
                        <p>Jared Hess</p>
                    </div>
                </div>
                <div className="movie-info">
                <div className="movie-title">
                        <p> Song Sung Blue </p>
                    </div>
                    <div className="movie-stats">
                        <p>2025</p>
                        <p>Hugh Jackman, Kate Hudson, Ella Anderson</p>
                        <p>Craig Brewer</p>
                    </div>
                </div>
            </div>
            </div>
            <div className="solved-message">
            <div className="congrats">
                CONGRATS:
                <span className="message">You solved the MovieMaze in TWO guesses!</span>
            </div>
            </div>
            <div className="final-path">
            <div className="started-poster">
                <img className="started" alt="Poster1"
                    src="https://m.media-amazon.com/images/M/MV5BZDU5MDNiMGItYjVmZi00NDUxLTg2OTktNGE0NzNlNzM4NzgyXkEyXkFqcGc@._V1_SX300.jpg" />
            </div>
            <img className="arrow" alt="arrow1" src="arrow.svg" />
            <div className="guess1-poster">
                <img className="1" alt="guess-poster1"
                    src="https://m.media-amazon.com/images/M/MV5BYzFjMzNjOTktNDBlNy00YWZhLWExYTctZDcxNDA4OWVhOTJjXkEyXkFqcGc@._V1_SX300.jpg" />
            </div>
            <img className="arrow" alt="arrow1" src="arrow.svg" />
            <div className="guess2-poster">
                <img className="2" alt="guess-poster2"
                    src="https://m.media-amazon.com/images/M/MV5BYmQ2YjhjNjgtNGQxNC00NmI0LWEzMjktNWEzMWY2OTUwZjFiXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg" />
            </div>
            <img className="arrow" alt="arrow1" src="arrow.svg" />
            <div className="ended-poster">
                <img className="ended" alt="Poster 2"
                src="https://m.media-amazon.com/images/M/MV5BMjE4NTA1NzExN15BMl5BanBnXkFtZTYwNjc3MjM3._V1_QL75_UY562_CR0,0,380,562_.jpg" />
            </div>
            </div>
        </main>
    );
}