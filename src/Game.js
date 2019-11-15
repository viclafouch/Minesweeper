import React, { useContext } from 'react'
import Won from '@components/Won/Won'
import Header from '@components/Header/Header'
import Died from '@components/Died/Died'
import { DefaultContext } from '@store/DefaultContext'
import Board from '@containers/Board'
import Menu from '@containers/Menu'
import Controls from '@containers/Controls'
import { SET_OPTIONS, SET_STATUS } from '@store/reducer/constants'

function Game() {
  const [{ status, options, isVolumeEnabled }, dispatch] = useContext(DefaultContext)
  return (
    <div className="Game">
      <Header />
      <div className="container-game">
        {!options && <Menu />}
        {options && (
          <div className="container-game-wrapper">
            <Controls />
            <Board x={options.x} y={options.y} mines={options.mines} />
          </div>
        )}
      </div>

      <Died
        hasLost={status === 'lost'}
        isVolumeEnabled={isVolumeEnabled}
        retry={() => {
          dispatch({
            type: SET_OPTIONS,
            options: null
          })
          dispatch({
            type: SET_STATUS,
            status: 'in progress'
          })
        }}
      />
      <Won hasWon={status === 'won'} isVolumeEnabled={isVolumeEnabled} />
    </div>
  )
}

export default Game
