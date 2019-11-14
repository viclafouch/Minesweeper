import { debug } from '../../utils/index'
import { SET_STATUS } from './constants'

const DefaultReducer = (state, action) => {
  debug(`TCL: DefaultReducer -> type : ${action.type}`)
  const { status, type } = action
  switch (type) {
    case SET_STATUS:
      debug(`TCL: DefaultReducer -> set status to ${status}`)
      return {
        ...state,
        status
      }
    default:
      return state
  }
}

export default DefaultReducer
