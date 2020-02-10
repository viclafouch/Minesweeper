import { randomIntFromInterval } from '.'
import Item from '../Item'

export const getAreaItem = ({
  x,
  y,
  w,
  h,
  rows
}: {
  x: number
  y: number
  w: number
  h: number
  rows: Array<Array<Item>>
}): Array<Item> => {
  const area: Array<Item> = []
  // Le doliprane de 1000 a été d'une grande aide
  if (x > 0) area.push(rows[x - 1][y]) // top
  if (y > 0) area.push(rows[x][y - 1]) // left
  if (y < w - 1) area.push(rows[x][y + 1]) // right
  if (x < h - 1) area.push(rows[x + 1][y]) // bottom
  if (x > 0 && y > 0) area.push(rows[x - 1][y - 1]) // top left
  if (x > 0 && y < w - 1) area.push(rows[x - 1][y + 1]) // top right
  if (x < h - 1 && y > 0) area.push(rows[x + 1][y - 1]) // bottom left
  if (x < h - 1 && y < w - 1) area.push(rows[x + 1][y + 1]) // bottom right
  return area
}

export const initBoard = (h: number, w: number, mines: number): Array<Array<Item>> => {
  const rows: Array<Array<Item>> = []
  let minesPlanted = 0
  for (let i = 0; i < h; i += 1) {
    rows.push([])
    for (let j = 0; j < w; j += 1) {
      rows[i][j] = {
        x: i,
        y: j,
        isMine: false,
        mines: 0,
        isEmpty: true,
        isVisible: false,
        isFlagged: false
      }
    }
  }

  while (minesPlanted < mines) {
    const randomIntX: number = randomIntFromInterval(0, h - 1)
    const randomIntY: number = randomIntFromInterval(0, w - 1)
    if (!rows[randomIntX][randomIntY].isMine) {
      rows[randomIntX][randomIntY].isMine = true
      minesPlanted += 1
    }
  }

  for (let x = 0; x < h; x += 1) {
    for (let y = 0; y < w; y += 1) {
      rows[x][y].mines = getAreaItem({ x, y, w, h, rows }).reduce(
        (accumulator: number, currentValue: Item) => (currentValue.isMine ? accumulator + 1 : accumulator),
        0
      )
      rows[x][y].isEmpty = !rows[x][y].mines
    }
  }

  return rows
}
