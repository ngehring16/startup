import React from 'react';
import './play.css';

export function Play() {
  return (
    <main className="scoresheet">
        <div className="players">
        Player:
        <span className="player-name">Movie guy</span>
        </div>
        <div>
        <label for="count">Score</label>
        <input type="text" id="count" value="--" readonly />
        </div>
        <div>
        <label for="count">HighScore</label>
        <input type="text" id="count" value="900" readonly />
        </div>

        <br />
        <br />

        <div className="movies">
        <div className="start-poster">
            <img className="start" alt="Poster1"
            src="https://m.media-amazon.com/images/M/MV5BZDU5MDNiMGItYjVmZi00NDUxLTg2OTktNGE0NzNlNzM4NzgyXkEyXkFqcGc@._V1_SX300.jpg" />
            <div className="movie-info">
            <div className="movie-title">
                <p> Kung Fu Panda </p>
            </div>
            <div className="movie-stats">
                <p>2008</p>
                <p>Jack Black, Ian McShane, Angelina Jolie</p>
                <p>Mark Osborne, John Stevenson</p>
            </div>
            </div>
        </div>
        <img className="arrow" alt="arrow1" src="arrow.svg" />
        <div className="end-poster">
            <img className="end" alt="Poster 2"
            src="https://m.media-amazon.com/images/M/MV5BMjE4NTA1NzExN15BMl5BanBnXkFtZTYwNjc3MjM3._V1_QL75_UY562_CR0,0,380,562_.jpg" />
            <div className="movie-info">
            <div className="movie-title">
                <p> How to Lose a Guy in 10 Days </p>
            </div>
            <div className="movie-stats">
                <p>2003</p>
                <p>Kate Hudson, Matthew McConaughey, Adam Goldberg</p>
                <p>Donald Petrie</p>
            </div>
            </div>
        </div>
        </div>

        <br />
        <br />

        <div className="guesses">
        <div className="selectors">
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess1">Guess ONE:</label>
                <input type="text" className="form-control" id="guess1" placeholder="a minecraft movie"/>

                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess2">Guess TWO:</label>
                <input type="text" className="form-control" id="guess2" placeholder="song sung blue"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess3">Guess THREE:</label>
                <input type="text" className="form-control" id="guess3" placeholder="movie #3"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess4">Guess FOUR:</label>
                <input type="text" className="form-control" id="guess4" placeholder="movie #4"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>  
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess5">Guess FIVE:</label>
                <input type="text" className="form-control" id="guess5" placeholder="movie #5"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess6">Guess SIX:</label>
                <input type="text" className="form-control" id="guess6" placeholder="movie #6"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess7">Guess SEVEN:</label>
                <input type="text" className="form-control" id="guess7" placeholder="movie #7"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess8">Guess EIGHT:</label>
                <input type="text" className="form-control" id="guess8" placeholder="movie #8"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
                <div className="form-group">
                <label for="guess9">Guess NINE:</label>
                <input type="text" className="form-control" id="guess9" placeholder="movie #9"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div>
            <form action="play.html" method="get">
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