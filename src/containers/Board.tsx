import * as React from 'react'
import { useState, useContext, useRef, useLayoutEffect } from 'react'
import Cell from '../components/Cell/Cell'
import { initBoard, getAreaItem } from '../utils/helpers'
import { DefaultContext } from '../store/DefaultContext'
import { SET_STATUS, SET_OPTIONS } from '../store/reducer/constants'
import { randomIntFromInterval } from '../utils'
import Item from '../Item'

type BoardProps = {
  x: number
  y: number
  mines: number
}

function Board({ x: w, y: h, mines }: BoardProps): JSX.Element {
  const [audio, setAudio] = useState<number | null>(null)
  const audioA = useRef<HTMLAudioElement>(null)
  const audioB = useRef<HTMLAudioElement>(null)
  const audioC = useRef<HTMLAudioElement>(null)
  const audioD = useRef<HTMLAudioElement>(null)
  const [rows, setRows] = useState<Array<Item> | any>(initBoard(w, h, mines))
  const [{ options, isDebugging, isVolumeEnabled }, dispatch] = useContext(DefaultContext)

  useLayoutEffect(() => {
    if (!isVolumeEnabled) return
    const audioACurrent: HTMLAudioElement = audioA.current
    const audioBCurrent: HTMLAudioElement = audioB.current
    const audioCCurrent: HTMLAudioElement = audioC.current
    const audioDCurrent: HTMLAudioElement = audioD.current
    if (audio === 1) audioACurrent.play()
    if (audio === 2) audioBCurrent.play()
    if (audio === 3) audioCCurrent.play()
    if (audio === 4) audioDCurrent.play()
    return (): void => {
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

  const showResult = (): void => {
    setRows(
      rows.map(
        (row: Array<Item>): Array<Item> =>
          row.map(
            (item: Item): Item => {
              item.isVisible = true
              return item
            }
          )
      )
    )
  }

  const showEmptyItem = (item: Item): Array<Array<Item>> => {
    const updatedRows: Array<Array<Item>> = [...rows]
    const area: Array<Item> = getAreaItem({ x: item.x, y: item.y, w, h, rows })
    for (const siblingItems of area) {
      if (!siblingItems.isVisible && !siblingItems.isFlagged && (siblingItems.isEmpty || !siblingItems.isMine)) {
        updatedRows[siblingItems.x][siblingItems.y].isVisible = true
        if (siblingItems.isEmpty) showEmptyItem(siblingItems)
      }
    }
    return updatedRows
  }

  const handleAddFlag = (e: Event, item: Item): void => {
    e.preventDefault()
    if (item.isVisible || isDebugging) return null
    if (!item.isFlagged && !options.flags) return

    const updatedRows = [...rows]
    updatedRows[item.x][item.y].isFlagged = !updatedRows[item.x][item.y].isFlagged

    let nbFlagged: number = options.flags
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

    return
  }

  const handleSelectCell = (item: Item): void => {
    let updatedRows: Array<any> | any = [...rows]
    if (item.isVisible || isDebugging) return null

    if (item.isMine) {
      dispatch({
        type: SET_STATUS,
        status: 'lost'
      })
      showResult()
      return
    }

    setAudio(null)
    updatedRows[item.x][item.y].isVisible = true

    if (updatedRows[item.x][item.y].isFlagged) {
      updatedRows[item.x][item.y].isFlagged = false
      dispatch({
        type: SET_OPTIONS,
        options: {
          ...options,
          flags: options.flags + 1
        }
      })
    }

    if (item.isEmpty) updatedRows = showEmptyItem(item)

    const notVisibleCells = updatedRows.flat(1).filter(i => !i.isVisible)

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

  const cssVar = { '--columns': h, '--rows': w } as React.CSSProperties

  return (
    <>
      <div className="Board" style={cssVar}>
        {rows.map(row =>
          row.map(item => (
            <Cell
              isDebugging={isDebugging}
              key={item.x * row.length + item.y}
              onClick={(): void => handleSelectCell(item)}
              onContextMenu={(e: Event): void => handleAddFlag(e, item)}
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
