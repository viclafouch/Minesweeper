import React, { useState, useContext } from 'react'
import Cell from '@components/Cell/Cell'
import { initBoard, getAreaItem } from '@utils/helpers'
import { DefaultContext } from '@store/DefaultContext'
import { SET_STATUS } from '@store/reducer/constants'

function Board({ x: w, y: h, mines }) {
  const [rows, setRows] = useState(initBoard(w, h, mines))
  const [, dispatch] = useContext(DefaultContext)

  const showResult = () => {
    setRows(
      rows.map(row =>
        row.map(item => {
          item.isRevealed = true
          return item
        })
      )
    )
  }

  const showEmptyItem = item => {
    const updatedRows = [...rows]
    const area = getAreaItem({ x: item.x, y: item.y, w, h, rows })
    for (const siblingItems of area) {
      if (!siblingItems.isRevealed && (siblingItems.isEmpty || !siblingItems.isMine)) {
        updatedRows[siblingItems.x][siblingItems.y].isRevealed = true
        if (siblingItems.isEmpty) showEmptyItem(siblingItems)
      }
    }
    return updatedRows
  }

  const handleSelectCell = item => {
    let updatedRows = [...rows]
    if (item.isRevealed || item.isFlagged) return null
    if (item.isMine) {
      dispatch({
        type: SET_STATUS,
        status: 'lost'
      })
      showResult()
      return
    }

    updatedRows[item.x][item.y].isRevealed = true
    updatedRows[item.x][item.y].isFlagged = false

    if (item.isEmpty) updatedRows = showEmptyItem(item)

    const notVisibleCells = updatedRows.flat(1).filter(i => !i.isRevealed)

    if (notVisibleCells.length === mines) {
      dispatch({
        type: SET_STATUS,
        status: 'won'
      })
    }

    setRows(updatedRows)
  }

  return (
    <div className="Board" style={{ '--columns': h, '--rows': w }}>
      {rows.map(row =>
        row.map(item => (
          <Cell key={item.x * row.length + item.y} onClick={() => handleSelectCell(item)} cMenu={() => {}} value={item} />
        ))
      )}
    </div>
  )
}

export default Board
