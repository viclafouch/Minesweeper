export const randomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)

export const debug = (str: string): void =>
  process.env.NODE_ENV !== 'production' && console.log(`%c ${str}`, 'color: yellow; font-weight: bold')
