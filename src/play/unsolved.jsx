import React from 'react';
import './play.css';
import Idset from './imdbIds'
import { PuzzleState } from './puzzleState';

const API_KEY = "20a57fb1"

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

async function retreiveMovie(kind, guess) {
    const apiTitle = encodeURIComponent(guess.trim().toLowerCase());
    const result = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&${kind}=${apiTitle}`);
    const data = await result.json();
    if (data.Response === 'False')
        return null;
    return new Movie(data.Title, data.Director, data.Actors, data.Year, data.imdbID, data.Poster)
}
const NUMBER_WORDS = ['ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN'];
export function Play() {
    const [puzzleState, setPuzzleState] = React.useState(PuzzleState.UnSolved);
    const [score, setScore] = React.useState(0);
    const [guesses, setGuesses] = React.useState([]);
    const [error, setError] = React.useState('');
    const [first_movie, setFirstMovie] = React.useState(null);
    const [last_movie, setLastMovie] = React.useState(null);

    React.useEffect(() => {
        retreiveMovie("i", "tt0133093").then(setFirstMovie);
        retreiveMovie("i", "tt0073486").then(setLastMovie);
    }, []);

    async function onPressed(e) {
        e.preventDefault();                          // stop the form from reloading the page
        const guess = e.target.elements[0].value;    // get the text the player typed
        if (!guess.trim()) return;                   // if it's empty, do nothing

        try {
            const movie = await retreiveMovie("t", guess);   // ask the API for that movie
            if (!movie) {                               // API found nothing
                setError(`Couldn't find "${guess}"`);   // show a message
                return;                                 // stop here
            }

            // Which movie are we comparing against?
            // If they've guessed before, use their last guess. Otherwise use the starting movie.
            let previous;
            if (guesses.length > 0) {
                previous = guesses[guesses.length - 1];
            } else {
                previous = first_movie;
            }

            // Same movie twice is not allowed
            if (movie.id === previous.id) {
                setError('Invalid selection');
                return;
            }

            // Add up points for each thing the two movies share
            let points = 0;
            if (movie.director === previous.director) points += 20;
            if (movie.year === previous.year)         points += 10;

            // Actors: check if ANY actor appears in both casts
            const oldCast = previous.actors.split(', ');
            const shared = movie.actors.split(', ').some(a => oldCast.includes(a));
            if (shared) points += 40;

            // Nothing in common means it's not a valid move
            if (points === 0) {
                setError('Invalid selection');
                return;
            }
            const lastCast = last_movie.actors.split(', ');
            const last_shared = movie.actors.split(', ').some(a => lastCast.includes(a));

            if ((movie.director === last_movie.director) | (movie.year === last_movie.year) | (last_shared)){
                setPuzzleState(PuzzleState.Solved);
            }
                

            // Everything passed, so save the results
            setError('');                            // clear any old error
            setScore(score + points);                // add the points to the total
            setGuesses([...guesses, movie]);         // add this movie to the guess list
            Idset.push(movie.id);
            e.target.reset();                        // clear the text box
        } catch {
            setError('Network error, try again.');   // something went wrong with the request
        }
}

    if (!first_movie || !last_movie) return <main>Loading...</main>;

    return (
        <main>
            <div className="scoresheet">
                <div className="players">
                    Player:
                    <span className="player-name">  Movie guy</span>
                </div>
                <div>
                    <label for="count">Score</label>
                    <input type="text" id="count" value={score} readonly />
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

            <br />
            <br />

            <div className="guesses">
                <div className="selectors">
                    {guesses.length < 10 && puzzleState !== PuzzleState.Solved && (
                        <form onSubmit={onPressed}>
                            <div className="form-group">
                                <label htmlFor="guess">Guess {NUMBER_WORDS[guesses.length]}:</label>
                                <input type="text" className="form-control" id="guess"
                                    placeholder={`movie #${guesses.length + 1}`} />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="information-2">
                    {guesses.map(m => (
                        <div className="movie-info" key={m.id}>
                            <div className="movie-title"><p>{m.title}</p></div>
                            <div className="movie-stats">
                                <p>{m.year}</p>
                                <p>{m.actors}</p>
                                <p>{m.director}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <br />
            <br />
            <div className="solved-message">
                {error && <p className="error">{error}</p>}
                {puzzleState === PuzzleState.Solved &&(
                    <div className="congrats">
                        CONGRATS:
                        <span className="message">You solved the MovieMaze in {guesses.length} guesses!</span>
                    </div>
                )}
            </div>
            <br />
            <br />
            <div>
            {puzzleState === PuzzleState.Solved && (
                <div className="final-path">
                    <div className="started-poster">
                        <img className="started" alt={first_movie.title} src={first_movie.poster} />
                    </div>

                    {guesses.map(m => (
                        <React.Fragment key={m.id}>
                            <img className="arrow" alt="arrow" src="arrow.svg" />
                            <div className="guess-poster">
                                <img alt={m.title} src={m.poster} />
                            </div>
                        </React.Fragment>
                    ))}

                    <img className="arrow" alt="arrow" src="arrow.svg" />
                    <div className="ended-poster">
                        <img className="ended" alt={last_movie.title} src={last_movie.poster} />
                    </div>
                </div>
            )}
            </div>
        </main>
    );
}