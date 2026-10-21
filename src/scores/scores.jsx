import React from 'react';
import './scores.css';
import { GameEvent, GameNotifier } from '../play/gameNotifier';

export function Scores() {
  const [scores, setScores] = React.useState([]);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    setEvents([...GameNotifier.events]);

    function handleEvent(event) {
      setEvents((prev) => [...prev, event]);
    }

    GameNotifier.addHandler(handleEvent);

    return () => {
      GameNotifier.removeHandler(handleEvent);
    };
  }, []);
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
  const messages = events.slice(-10).map((event, i) => {
  if (event.type === GameEvent.End) {
    return (
      <li key={i} className="player-name">
        {event.from.split('@')[0]} solved the MovieMaze! They scored {event.value.score} with {event.value.guesses} guesses
      </li>
    );
  }
  return null;
  });
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

      <br />
      <br/>

      <ul className="notification">
        <div className="title">
          <p>LIVE UPDATES</p>
        </div>
        {messages}
      </ul>
      <br />
    </main>
  );
}