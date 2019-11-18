import React from 'react'
import ReactDOM from 'react-dom'
import './scss/base.scss'
import { DefaultProvider } from '@store/DefaultContext'
import Game from './Game'

const isVolumeEnabled = localStorage.getItem('isVolumeEnabled')

ReactDOM.render(
  <DefaultProvider
    initialState={{
      status: 'in progress',
      options: null,
      isDebugging: false,
      isVolumeEnabled: !isVolumeEnabled ? true : isVolumeEnabled === 'true'
    }}
  >
    <Game />
  </DefaultProvider>,
  document.getElementById('root')
)
