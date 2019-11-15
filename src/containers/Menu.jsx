import React, { useContext } from 'react'
import { DefaultContext } from '@store/DefaultContext'
import { SET_OPTIONS } from '@store/reducer/constants'

function Menu() {
  const [, dispatch] = useContext(DefaultContext)
  const handleClick = difficulty => {
    const options = {}
    if (difficulty === 1) {
      options.x = 6
      options.y = 6
      options.mines = 1
    } else if (difficulty === 2) {
      options.x = 8
      options.y = 8
      options.mines = 10
    } else if (difficulty === 3) {
      options.x = 10
      options.y = 10
      options.mines = 12
    }
    dispatch({
      type: SET_OPTIONS,
      options
    })
  }

  return (
    <div className="Menu">
      <div>Choose difficulty</div>
      <button type="button" onClick={() => handleClick(1)}>
        Easy
      </button>
      <button type="button" onClick={() => handleClick(2)}>
        Medium
      </button>
      <button type="button" onClick={() => handleClick(3)}>
        Hard
      </button>
    </div>
  )
}

export default Menu
