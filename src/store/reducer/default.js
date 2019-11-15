import { debug } from '../../utils/index'
import { SET_STATUS, SET_OPTIONS, TOGGLE_DEBUGGING, TOGGLE_AUDIO } from './constants'

const DefaultReducer = (state, action) => {
  debug(`TCL: DefaultReducer -> type : ${action.type}`)
  const { status, options, type } = action
  switch (type) {
    case SET_STATUS:
      debug(`TCL: DefaultReducer -> set status to ${status}`)
      return {
        ...state,
        status
      }
    case SET_OPTIONS:
      debug(`TCL: DefaultReducer -> set options to ${JSON.stringify(options)}`)
      return {
        ...state,
        options
      }
    case TOGGLE_DEBUGGING:
      debug(`TCL: DefaultReducer -> set debugging to ${!state.isDebugging}`)
      return {
        ...state,
        isDebugging: !state.isDebugging
      }
    case TOGGLE_AUDIO:
      debug(`TCL: DefaultReducer -> set debugging to ${!state.isVolumeEnabled}`)
      return {
        ...state,
        isVolumeEnabled: !state.isVolumeEnabled
      }
    default:
      return state
  }
}

export default DefaultReducer
