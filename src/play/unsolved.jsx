import React from 'react';

const NUMBER_WORDS = ['ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN'];

export function Unsolved({ first_movie, last_movie, guesses, error, onPressed }) {
    return (
        <div>
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

            <div className="guesses">
                <div className="selectors">
                    {guesses.length < 10 && (
                        <form onSubmit={onPressed}>
                            <div className="form-group">
                                <label htmlFor="guess">Guess {NUMBER_WORDS[guesses.length]}:</label>
                                <input type="text" className="form-control" id="guess"
                                    placeholder={`movie #${guesses.length + 1}`} />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    )}
                    {guesses.length === 10 && (
                        <div className="failed_message">
                            <p>Look's like you got lost in the MOVIEMAZE!</p>
                        </div>
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

            {error && <p className="error">{error}</p>}
        </div>
    );
}