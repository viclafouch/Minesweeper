import * as React from 'react'
import Won from './components/Won/Won'
import Died from './components/Died/Died'
import { DefaultContext } from './store/DefaultContext'
import Board from './containers/Board'
import Menu from './containers/Menu'
import Controls from './containers/Controls'
import { SET_OPTIONS, SET_STATUS } from './store/reducer/constants'

const Game: React.FunctionComponent = () => {
  const [state, dispatch] = React.useContext(DefaultContext)

  const resetGame = (): any => {
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
        {!state.options && <Menu />}
        {state.options && (
          <div className="container-game-wrapper">
            <Controls reset={resetGame} />
            <Board x={state.options.x} y={state.options.y} mines={state.options.mines} />
          </div>
        )}
      </div>

      <Won hasWon={state.status === 'won'} isVolumeEnabled={state.isVolumeEnabled} reset={(): any => resetGame()} />
      <Died
        hasLost={state.status === 'lost'}
        status={state.status}
        isVolumeEnabled={state.isVolumeEnabled}
        retry={(): any => resetGame()}
      />
    </div>
  )
}

export default Game
