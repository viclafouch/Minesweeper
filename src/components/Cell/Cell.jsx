import React from 'react'
import './cell.scss'

function Mine(props) {
  const { value, isDebugging, onClick, onContextMenu } = props

  const getValue = () => {
    if (isDebugging) {
      if (value.isMine) return '💣'
      return value.mines ? value.mines : ''
    }
    if (!value.isRevealed) return value.isFlagged ? '🚩' : null
    if (value.isMine) return '💣'
    if (value.mines === 0) return null
    return value.mines
  }

  return (
    <div
      onClick={onClick}
      onKeyPress={event => event.key === 'Enter' && onClick()}
      onContextMenu={onContextMenu}
      className={`Cell ${value.isRevealed ? 'is-revealed' : ''}`}
      tabIndex="0"
      role="button"
    >
      <span>{getValue()}</span>
    </div>
  )
}

export default Mine
