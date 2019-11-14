export const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export const debug = str => console.log(`%c ${str}`, 'color: yellow; font-weight: bold')
