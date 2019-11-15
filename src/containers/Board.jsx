import React, { useState, useContext, useRef, useLayoutEffect } from 'react'
import Cell from '@components/Cell/Cell'
import { initBoard, getAreaItem } from '@utils/helpers'
import { DefaultContext } from '@store/DefaultContext'
import { SET_STATUS, SET_OPTIONS } from '@store/reducer/constants'
import { randomIntFromInterval } from '@utils'

function Board({ x: w, y: h, mines }) {
  const [audio, setAudio] = useState(null)
  const audioA = useRef(null)
  const audioB = useRef(null)
  const audioC = useRef(null)
  const audioD = useRef(null)
  const [rows, setRows] = useState(initBoard(w, h, mines))
  const [{ options, isDebugging, isVolumeEnabled }, dispatch] = useContext(DefaultContext)

  useLayoutEffect(() => {
    if (!isVolumeEnabled) return
    const audioACurrent = audioA.current
    const audioBCurrent = audioB.current
    const audioCCurrent = audioC.current
    const audioDCurrent = audioD.current
    if (audio === 1) audioACurrent.play()
    if (audio === 2) audioBCurrent.play()
    if (audio === 3) audioCCurrent.play()
    if (audio === 4) audioDCurrent.play()
    return () => {
      audioACurrent.pause()
      audioBCurrent.pause()
      audioCCurrent.pause()
      audioDCurrent.pause()
      audioACurrent.currentTime = 0
      audioBCurrent.currentTime = 0
      audioCCurrent.currentTime = 0
      audioDCurrent.currentTime = 0
    }
  }, [audio, isVolumeEnabled])

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

  const handleAddFlag = (e, item) => {
    e.preventDefault()
    if (item.isRevealed || isDebugging) return null
    if (!item.isFlagged && !options.flags) return
    const updatedRows = [...rows]
    updatedRows[item.x][item.y].isFlagged = !updatedRows[item.x][item.y].isFlagged
    let nbFlagged = options.flags
    if (updatedRows[item.x][item.y].isFlagged) nbFlagged -= 1
    else nbFlagged += 1
    setRows(updatedRows)
    dispatch({
      type: SET_OPTIONS,
      options: {
        ...options,
        flags: nbFlagged
      }
    })
  }

  const handleSelectCell = item => {
    let updatedRows = [...rows]
    if (item.isRevealed || item.isFlagged || isDebugging) return null
    if (item.isMine) {
      dispatch({
        type: SET_STATUS,
        status: 'lost'
      })
      showResult()
      return
    }

    setAudio(null)
    updatedRows[item.x][item.y].isRevealed = true
    updatedRows[item.x][item.y].isFlagged = false

    if (item.isEmpty) updatedRows = showEmptyItem(item)

    const notVisibleCells = updatedRows.flat(1).filter(i => !i.isRevealed)

    if (notVisibleCells.length === mines) {
      dispatch({
        type: SET_STATUS,
        status: 'won'
      })
    } else {
      setAudio(randomIntFromInterval(1, 4))
    }

    setRows(updatedRows)
  }

  return (
    <>
      <div className="Board" style={{ '--columns': h, '--rows': w }}>
        {rows.map(row =>
          row.map(item => (
            <Cell
              isDebugging={isDebugging}
              key={item.x * row.length + item.y}
              onClick={() => handleSelectCell(item)}
              onContextMenu={e => handleAddFlag(e, item)}
              value={item}
            />
          ))
        )}
      </div>
      <audio ref={audioA} src="https://www.myinstants.com/media/sounds/owenwowson3.mp3">
        <track default kind="captions" />
      </audio>
      <audio ref={audioB} src="https://www.myinstants.com/media/sounds/owenwowson5.mp3">
        <track default kind="captions" />
      </audio>
      <audio ref={audioC} src="https://www.myinstants.com/media/sounds/owenwowson2.mp3">
        <track default kind="captions" />
      </audio>
      <audio ref={audioD} src="https://www.myinstants.com/media/sounds/owenwowson4.mp3">
        <track default kind="captions" />
      </audio>
    </>
  )
}

export default Board
