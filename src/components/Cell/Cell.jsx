import React from 'react'
import './cell.scss'

function Mine(props) {
  const { value, onClick, cMenu } = props

  const getValue = () => {
    console.log(value.isMine)
    if (!value.isRevealed) return value.isFlagged ? '🚩' : null
    if (value.isMine) return '💣'
    if (value.neighbour === 0) return null
    return value.neighbour
  }

  return (
    <div onClick={onClick} onKeyDown={onClick} onContextMenu={cMenu} className="Cell" tabIndex="0" role="button">
      <span>{getValue()}</span>
    </div>
  )
}

export default Mine
