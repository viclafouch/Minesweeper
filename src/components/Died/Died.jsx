import React, { useLayoutEffect, useRef, useState } from 'react'
import './died.scss'

function Died({ hasLost, retry }) {
  const [isShowingRetry, setIsShowingRetry] = useState(false)
  const audio = useRef(null)

  useLayoutEffect(() => {
    if (hasLost) audio.current.play()
    const timeout = setTimeout(() => setIsShowingRetry(true), 6000)
    return () => {
      clearTimeout(timeout)
      setIsShowingRetry(false)
    }
  }, [hasLost])

  return (
    <div className={`Died ${hasLost ? 'show' : ''}`}>
      <span className="Died-text">You Died</span>
      {isShowingRetry && (
        <button type="button" onClick={retry}>
          Retry
        </button>
      )}
      <audio ref={audio} src="https://www.myinstants.com/media/sounds/dark-souls-_you-died_-sound-effect-from-youtube.mp3">
        <track default kind="captions" />
      </audio>
    </div>
  )
}

export default Died
