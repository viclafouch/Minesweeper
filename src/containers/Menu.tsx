import * as React from 'react'
import { useContext } from 'react'
import { DefaultContext } from '../store/DefaultContext'
import { SET_OPTIONS } from '../store/reducer/constants'
import { EASY_GAME, NORMAL_GAME, HARD_GAME } from '../constants'

function Menu(): JSX.Element {
  const [, dispatch] = useContext(DefaultContext)

  const handleClick = (difficulty: number): void => {
    let options = {}
    if (difficulty === 1) {
      options = { ...EASY_GAME }
    } else if (difficulty === 2) {
      options = { ...NORMAL_GAME }
    } else if (difficulty === 3) {
      options = { ...HARD_GAME }
    }
    dispatch({
      type: SET_OPTIONS,
      options
    })
  }

  return (
    <div className="Menu">
      <div>Choose difficulty</div>
      <button type="button" onClick={(): void => handleClick(1)} tabIndex={0}>
        Easy
      </button>
      <button type="button" onClick={(): void => handleClick(2)} tabIndex={0}>
        Medium
      </button>
      <button type="button" onClick={(): void => handleClick(3)} tabIndex={0}>
        Hard
      </button>
    </div>
  )
}

export default Menu
