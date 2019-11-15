import React from 'react'
import ReactDOM from 'react-dom'
import './scss/base.scss'
import { DefaultProvider } from '@store/DefaultContext'
import Game from './Game'

ReactDOM.render(
  <DefaultProvider
    initialState={{
      status: 'in progress',
      options: null
    }}
  >
    <Game />
  </DefaultProvider>,
  document.getElementById('root')
)
