import React from 'react';

export function Solved({ first_movie, last_movie, guesses }) {
    return (
        <div>
            <div className="solved-message">
                <div className="congrats">
                    CONGRATS:
                    <span className="message">
                        You solved the MovieMaze in {guesses.length} guesses!
                    </span>
                </div>
            </div>
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
        </div>
    );
}