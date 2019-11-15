import React, { useContext } from 'react'
import Won from '@components/Won/Won'
import Died from '@components/Died/Died'
import { DefaultContext } from '@store/DefaultContext'
import Board from '@containers/Board'
import Menu from '@containers/Menu'
import Controls from '@containers/Controls'
import { SET_OPTIONS, SET_STATUS } from '@store/reducer/constants'

function Game() {
  const [{ status, options, isVolumeEnabled }, dispatch] = useContext(DefaultContext)

  const resetGame = () => {
    dispatch({
      type: SET_OPTIONS,
      options: null
    })
    dispatch({
      type: SET_STATUS,
      status: 'in progress'
    })
  }

  return (
    <div className="Game">
      <div className="container-game">
        {!options && <Menu />}
        {options && (
          <div className="container-game-wrapper">
            <Controls reset={resetGame} />
            <Board x={options.x} y={options.y} mines={options.mines} />
          </div>
        )}
      </div>

      <Died hasLost={status === 'lost'} status={status} isVolumeEnabled={isVolumeEnabled} retry={() => resetGame()} />
      <Won hasWon={status === 'won'} status={status} isVolumeEnabled={isVolumeEnabled} reset={() => resetGame()} />
    </div>
  )
}

export default Game
