export const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export const debug = str => process.env.NODE_ENV !== 'production' && console.log(`%c ${str}`, 'color: yellow; font-weight: bold')
