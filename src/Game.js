import React, { useContext } from 'react'
import Board from './containers/Board'
import Header from './components/Header/Header'
import Died from './components/Died/Died'
import { DefaultContext } from './store/DefaultContext'

function Game() {
  const options = {
    x: 8,
    y: 8,
    mines: 10
  }
  const [{ status }] = useContext(DefaultContext)
  return (
    <div className="Game">
      <Header />
      <div className="container-game">
        <Board x={options.x} y={options.y} mines={options.mines} />
      </div>

      <Died hasLost={status === 'lost'} />
    </div>
  )
}

export default Game
