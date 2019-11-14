import React from 'react'
import './cell.scss'

function Mine(props) {
  const { value, onClick, cMenu } = props

  const getValue = () => {
    if (!value.isRevealed) return value.isFlagged ? '🚩' : null
    if (value.isMine) return '💣'
    if (value.mines === 0) return null
    return value.mines
  }

  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      onContextMenu={cMenu}
      className={`Cell ${value.isRevealed ? 'is-revealed' : ''}`}
      tabIndex="0"
      role="button"
    >
      <span>{getValue()}</span>
    </div>
  )
}

export default Mine
