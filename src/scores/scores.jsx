import React from 'react';
import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);

  // Demonstrates rendering an array with React
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.guesses}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='5'>Be the first to score</td>
      </tr>
    );
  }


  return (
    <main className="container-fluid bg-secondary">
      <table className="table table-dark table-striped-columns">
        <thead className="table-warning">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Guesses</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id='scores'>{scoreRows}</tbody>
      </table>

      <ul className="notification">
        <div className="title">
          <p>LIVE UPDATES</p>
        </div>
        <li className="player-name">Cary Grant scored 500 with 9 guesses</li>
        <li className="player-name">Anya Taylor Joy scored 900 with 4 guesses </li>
        <li className="player-name">Vito scored 2000 with 4 guesses</li>
      </ul>
      <br />
    </main>
  );
}