import React from 'react'
import Board from './containers/Board'
import Header from './components/Header/Header'

function Game() {
  const options = {
    x: 8,
    y: 8,
    mines: 10
  }

  return (
    <div className="Game">
      <Header />
      <div className="container-game">
        <Board x={options.x} y={options.y} mines={options.mines} />
      </div>
    </div>
  )
}

export default Game
