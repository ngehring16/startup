import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';

export default function App() {
  return (
    <BrowserRouter>
        <body className="bg-dark text-light">
            <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
                <NavLink className="navbar-brand" to="#">MovieMaze<sup>&reg;</sup></NavLink>
                <menu className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link active" to="">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="play">Play</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="scores">Leaderboard</NavLink>
                </li>
                </menu>
            </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/scores' element={<Scores />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-white-50">
            <div className="container-fluid">
                <span className="text-reset">Nathan Gehring</span>
                <NavLink className="text-reset" to="https://github.com/ngehring16/startup">GitHub</NavLink>
            </div>
            </footer>
        </body>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
