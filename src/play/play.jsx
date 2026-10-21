import React from 'react';
import './play.css';
import Idset from './imdbIds';
import { PuzzleState } from './puzzleState';
import { Unsolved } from './unsolved';
import { Solved } from './solved';
import { getDailyIds } from './dailyPuzzle';
import { GameEvent, GameNotifier } from './gameNotifier';

const API_KEY = "20a57fb1";

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

function saveScore(userName, score, guesses) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date , guesses: guesses};

        // Let other players know the game has concluded
    GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);

    updateScoresLocal(newScore);
}

function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
    scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
        if (newScore.score > prevScore.score) {
            scores.splice(i, 0, newScore);
            found = true;
            break;
        }
    }

    if (!found) {
        scores.push(newScore);
    }

    if (scores.length > 10) {
        scores.length = 10;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
}

export function Play(props) {
    const storageKey = `highscore_${props.userName}`;
    const [highscore, setHighscore] = React.useState(
        Number(localStorage.getItem(storageKey)) || 0
    );
    const [puzzleState, setPuzzleState] = React.useState(PuzzleState.UnSolved);
    const [score, setScore] = React.useState(0);
    const [guesses, setGuesses] = React.useState([]);
    const [error, setError] = React.useState('');
    const [first_movie, setFirstMovie] = React.useState(null);
    const [last_movie, setLastMovie] = React.useState(null);

    React.useEffect(() => {
        const {firstId, lastId} = getDailyIds(Idset)
        retreiveMovie("i", firstId).then(setFirstMovie);
        retreiveMovie("i", lastId).then(setLastMovie);
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
        
                    let newScore = score + points;   // the total after this guess

                    const won = (movie.director === last_movie.director)
                            || (movie.year === last_movie.year)
                            || last_shared;

                    if (won) {
                        setPuzzleState(PuzzleState.Solved);
                        const counter = Math.max(0, 1000 - guesses.length * 100);
                        newScore += counter;
                        saveScore(props.userName, newScore, guesses.length + 1);
                        if (newScore > highscore) {                       // beat the old record?
                            setHighscore(newScore);                       // update what's on screen
                            localStorage.setItem(storageKey, newScore);   // save it for next time
                        }

                    }

                    setError('');
                    setScore(newScore);
                    setGuesses([...guesses, movie]);
                    e.target.reset();                        // clear the text box
                } catch {
                    setError('Network error, try again.');   // something went wrong with the request
                }
    }
    if (!first_movie || !last_movie) return <main>Loading...</main>;

    return (
        <main className="container-fluid bg-secondary text-center">

            <div className="scoresheet">
                <div className="players">
                    Player:
                    <span className="player-name">   {props.userName}</span>
                </div>
                <div>
                    <label htmlFor="score">Score</label>
                    <input type="text" id="score" value={score} readOnly />
                </div>
                <div>
                    <label htmlFor="highscore">HighScore</label>
                    <input type="text" id="highscore" value={highscore} readOnly />
                </div>
            </div>

            {puzzleState === PuzzleState.Solved ? (
                <Solved
                    first_movie={first_movie}
                    last_movie={last_movie}
                    guesses={guesses}
                />
            ) : (
                <Unsolved
                    first_movie={first_movie}
                    last_movie={last_movie}
                    guesses={guesses}
                    error={error}
                    onPressed={onPressed}
                />
            )}
        </main>
    );
}