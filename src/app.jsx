import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { AuthState } from './login/authstate';
import { Scores } from './scores/scores';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [authState, setAuthState] = React.useState(AuthState.Unknown);

    React.useEffect(() => {
        fetch('/api/auth/me')
            .then((response) => {
                if (response.ok) {
                    setAuthState(AuthState.Authenticated);
                } else {
                    localStorage.removeItem('userName');
                    setAuthState(AuthState.Unauthenticated);
                }
            })
            .catch(() => setAuthState(AuthState.Unauthenticated));
    }, []);

    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark bg-dark">
                    <NavLink className="navbar-brand" to="/">MovieMaze<sup>&reg;</sup></NavLink>
                    <menu className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    {authState === AuthState.Authenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/play">Play</NavLink>
                        </li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/scores">Leaderboard</NavLink>
                        </li>
                    )}
                    </menu>
                </nav>
                </header>

                <Routes>
                    <Route
                        path='/'
                        element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                            }}
                        />
                        }
                        exact
                    />
                    <Route path='/play' element={
                        <RequireAuth authState={authState}>
                            <Play userName={userName} />
                        </RequireAuth>
                    } />
                    <Route path='/scores' element={
                        <RequireAuth authState={authState}>
                            <Scores />
                        </RequireAuth>
                    } />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                    <span className="text-reset">Nathan Gehring</span>
                    <NavLink className="text-reset" to="https://github.com/ngehring16/startup">GitHub</NavLink>
                </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

function RequireAuth({ authState, children }) {
    if (authState === AuthState.Unknown) return null;   // still asking the server
    if (authState !== AuthState.Authenticated) return <Navigate to='/' replace />;
    return children;
}

export default App
