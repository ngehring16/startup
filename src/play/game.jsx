import React from 'react';

import { Button } from 'react-bootstrap';
import { SimonButton } from './simonButton';
import { delay } from './delay';
import { GameEvent, GameNotifier } from './gameNotifier';
import './simonGame.css';

export function MovieMazeGame(props) {
  const userName = props.userName;

  async function saveScore(score) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    // Let other players know the game has concluded
    GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);

    updateScoresLocal(newScore);
  }

  function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore.score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
  }

  // We use React refs so the game can drive button press events
  buttons.set('button-top-left', { position: 'button-top-left', ref: React.useRef() });
  buttons.set('button-top-right', { position: 'button-top-right', ref: React.useRef() });
  buttons.set('button-bottom-left', { position: 'button-bottom-left', ref: React.useRef() });
  buttons.set('button-bottom-right', { position: 'button-bottom-right', ref: React.useRef() });

  const buttonArray = Array.from(buttons, ([key, value]) => {
    return <SimonButton key={key} ref={value.ref} position={key} onPressed={() => onPressed(key)}></SimonButton>;
  });

  return (
    <div className='game'>
      <div className='button-container'>
        <>{buttonArray}</>
        <div className='controls center'>
          <div className='game-name'>
            Simon<sup>&reg;</sup>
          </div>
          <div className='score center'>{sequence.length === 0 ? '--' : sequence.length - 1}</div>
          <Button variant='primary' onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}


