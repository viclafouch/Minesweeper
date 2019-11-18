import * as React from 'react'
import { useEffect, useCallback } from 'react'
import './won.scss'

type WonProps = {
  hasWon: boolean
  isVolumeEnabled: boolean
  reset: any
}

const Won = ({ hasWon, isVolumeEnabled, reset }: WonProps): JSX.Element => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) reset()
    },
    [reset]
  )

  useEffect(() => {
    if (hasWon) document.body.addEventListener('keydown', handleEscape)
    return (): void => {
      document.body.removeEventListener('keydown', handleEscape)
    }
  }, [handleEscape, hasWon])

  return (
    <div className={`Won ${hasWon ? 'show' : ''}`}>
      {hasWon && (
        <div className="Won-wrapper">
          {isVolumeEnabled && (
            <iframe
              width="560"
              height="315"
              title="win"
              src="https://www.youtube.com/embed/wzEa9aqq0iQ?controls=0&amp;start=4&autoplay=1"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {!isVolumeEnabled && <img src="https://media1.giphy.com/media/f9RzoxHizH72k15FKS/giphy.gif" alt="won" />}
        </div>
      )}
    </div>
  )
}

export default Won
