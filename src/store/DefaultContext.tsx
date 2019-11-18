import * as React from 'react'
import { createContext, useEffect } from 'react'
import DefaultReducer, { Actions } from './reducer/default'

export interface State {
  status: string
  options: object | null
  isDebugging: boolean
  isVolumeEnabled: boolean
}

const isVolumeEnabled: string | undefined = localStorage.getItem('isVolumeEnabled')

const initialState: State = {
  status: 'in progress',
  options: null,
  isDebugging: false,
  isVolumeEnabled: isVolumeEnabled === undefined ? true : isVolumeEnabled === 'true'
}

export const DefaultContext = createContext<State | any>(initialState)

export function DefaultProvider(props: any): JSX.Element {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Actions>>(DefaultReducer, initialState)
  const { isVolumeEnabled } = state

  useEffect(() => {
    localStorage.isVolumeEnabled = isVolumeEnabled
  }, [isVolumeEnabled])

  return <DefaultContext.Provider value={[state, dispatch]}>{props.children}</DefaultContext.Provider>
}
