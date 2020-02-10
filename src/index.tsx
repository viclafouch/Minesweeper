import * as React from 'react'
import { render } from 'react-dom'
import './scss/base.scss'
import { DefaultProvider } from './store/DefaultContext'
import Game from './Game'

render(
  <DefaultProvider>
    <Game />
  </DefaultProvider>,
  document.getElementById('root')
)
