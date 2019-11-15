import React, { useContext } from 'react'
import { DefaultContext } from '@store/DefaultContext'
import { TOGGLE_DEBUGGING, TOGGLE_AUDIO } from '@store/reducer/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

function Controls() {
  const [{ options, isDebugging, isVolumeEnabled }, dispatch] = useContext(DefaultContext)
  return (
    <div className="Controls">
      <div>
        <span>{options.flags} 🚩</span>
      </div>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: TOGGLE_DEBUGGING
          })
        }
      >
        {`${isDebugging ? 'Hide' : 'Show'} grid`}
      </button>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: TOGGLE_AUDIO
          })
        }
      >
        <FontAwesomeIcon icon={isVolumeEnabled ? faVolumeMute : faVolumeUp} />
      </button>
    </div>
  )
}

export default Controls
