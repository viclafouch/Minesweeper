import * as React from 'react'
import { useContext } from 'react'
import { DefaultContext } from '../store/DefaultContext'
import { TOGGLE_DEBUGGING, TOGGLE_AUDIO } from '../store/reducer/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

type ControlsProps = {
  reset: any
}

function Controls({ reset }: ControlsProps): JSX.Element {
  const [{ options, isDebugging, isVolumeEnabled, status }, dispatch] = useContext(DefaultContext)

  return (
    <div className="Controls">
      <div>
        <span>{options.flags} 🚩</span>
      </div>
      {status === 'in progress' && (
        <button
          type="button"
          onClick={(): void =>
            dispatch({
              type: TOGGLE_DEBUGGING
            })
          }
        >
          {`${isDebugging ? 'Hide' : 'Show'} grid`}
        </button>
      )}
      {status !== 'in progress' && (
        <button type="button" onClick={reset}>
          Reset
        </button>
      )}

      <button
        type="button"
        onClick={(): void =>
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
