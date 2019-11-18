import * as React from 'react'
import Item from '../../Item'
import './cell.scss'

type CellProps = {
  value: Item
  isDebugging: boolean
  onClick: any
  onContextMenu: any
}

function Cell({ value, isDebugging, onClick, onContextMenu }: CellProps): JSX.Element {
  const getValue = (): string | number | null => {
    if (isDebugging) {
      if (value.isMine) return '💣'
      return value.mines ? value.mines : ''
    }
    if (!value.isVisible) return value.isFlagged ? '🚩' : null
    if (value.isMine) return '💣'
    if (value.mines === 0) return null
    return value.mines
  }

  return (
    <div
      onClick={onClick}
      onKeyPress={(event): void => event.key === 'Enter' && onClick()}
      onContextMenu={onContextMenu}
      className={`Cell ${value.isVisible ? 'is-revealed' : ''}`}
      tabIndex={0}
      role="button"
    >
      <span>{getValue()}</span>
    </div>
  )
}

export default Cell
