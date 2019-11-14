import React, { useState, useContext } from 'react'
import Cell from '@components/Cell/Cell'
import { initBoard } from '@utils/helpers'
import { DefaultContext } from '@store/DefaultContext'
import { SET_STATUS } from '@store/reducer/constants'

function Board({ x, y, mines }) {
  const [data] = useState(initBoard(x, y, mines))
  const [, dispatch] = useContext(DefaultContext)

  const handleSelectCell = item => {
    const { x: itemX, y: itemY, isMine } = item
    if (data[itemX][itemY].isRevealed || data[itemX][itemY].isFlagged) return null
    if (isMine) {
      dispatch({
        type: SET_STATUS,
        status: 'lost'
      })
    }
  }

  return (
    <div className="board" style={{ '--columns': y, '--rows': x }}>
      {data.map(row =>
        row.map(item => (
          <Cell key={item.x * row.length + item.y} onClick={() => handleSelectCell(item)} cMenu={() => {}} value={item} />
        ))
      )}
    </div>
  )
}

export default Board
