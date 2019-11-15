import { debug } from '../../utils/index'
import { SET_STATUS, SET_OPTIONS } from './constants'

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
    default:
      return state
  }
}

export default DefaultReducer
