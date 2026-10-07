import React from 'react';
import './scores.css';

export function Scores() {
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
        <tbody>
          <tr>
            <td>1</td>
            <td>Captain Kirk</td>
            <td>3400</td>
            <td>2</td>
            <td>09/16/26</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Vito</td>
            <td>2000</td>
            <td>4</td>
            <td>08/02/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Dracula</td>
            <td>1000</td>
            <td>5</td>
            <td>09/21/26</td>
          </tr>
        </tbody>
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