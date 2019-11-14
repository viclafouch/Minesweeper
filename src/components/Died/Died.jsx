import React, { useLayoutEffect, useRef } from 'react'
import './died.scss'

function Died({ hasLost }) {
  const audio = useRef(null)
  useLayoutEffect(() => {
    if (hasLost) audio.current.play()
  }, [hasLost])
  return (
    <div className={`Died ${hasLost ? 'show' : ''}`}>
      <span className="Died-text">You Died</span>
      <audio ref={audio} src="https://www.myinstants.com/media/sounds/dark-souls-_you-died_-sound-effect-from-youtube.mp3">
        <track default kind="captions" />
      </audio>
    </div>
  )
}

export default Died
