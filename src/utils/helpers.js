import { randomIntFromInterval } from '.'

export const initBoard = (x, y, mines) => {
  const data = []
  let minesPlanted = 0

  for (let i = 0; i < x; i += 1) {
    data.push([])
    for (let j = 0; j < y; j += 1) {
      data[i][j] = {
        x: i,
        y: j,
        isMine: false,
        neighbour: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false
      }
    }
  }

  while (minesPlanted < mines) {
    const randomIntX = randomIntFromInterval(0, x - 1)
    const randomIntY = randomIntFromInterval(0, y - 1)
    if (!data[randomIntX][randomIntY].isMine) {
      data[randomIntX][randomIntY].isMine = true
      minesPlanted += 1
    }
  }

  console.log(minesPlanted)

  return data
}
