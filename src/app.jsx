import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';

export default function App() {
  return (
  <body class="bg-dark text-light">
    <header class="container-fluid">
      <nav class="navbar fixed-top navbar-dark">
        <a class="navbar-brand" href="#">MovieMaze<sup>&reg;</sup></a>
        <menu class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="index">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="play">Play</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="scores">Leaderboard</a>
          </li>
        </menu>
      </nav>
    </header>

    <main>App components go here</main>

    <footer class="bg-dark text-white-50">
      <div class="container-fluid">
        <span class="text-reset">Nathan Gehring</span>
        <a class ="text-reset" href="https://github.com/ngehring16/startup">GitHub</a>
      </div>
    </footer>
  </body>
  );
}
