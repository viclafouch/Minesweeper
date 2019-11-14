import React, { useState } from 'react'
import { initBoard } from '../utils/helpers'
import Cell from '../components/Cell/Cell'

function Board({ x, y, mines }) {
  const [data] = useState(initBoard(x, y, mines))

  const displayingBoard = () =>
    data.map(datarow =>
      datarow.map(dataitem => (
        <Cell key={dataitem.x * datarow.length + dataitem.y} onClick={() => {}} cMenu={() => {}} value={dataitem} />
      ))
    )

  return (
    <div className="board" style={{ '--columns': y, '--rows': x }}>
      {displayingBoard()}
    </div>
  )
}

export default Board
