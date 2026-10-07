import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';

export default function App() {
  return (
  <body className="bg-dark text-light">
    <header className="container-fluid">
      <nav className="navbar fixed-top navbar-dark">
        <a className="navbar-brand" href="#">MovieMaze<sup>&reg;</sup></a>
        <menu className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="index">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="play">Play</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="scores">Leaderboard</a>
          </li>
        </menu>
      </nav>
    </header>

    <main>App components go here</main>

    <footer className="bg-dark text-white-50">
      <div className="container-fluid">
        <span className="text-reset">Nathan Gehring</span>
        <a className="text-reset" href="https://github.com/ngehring16/startup">GitHub</a>
      </div>
    </footer>
  </body>
  );
}
