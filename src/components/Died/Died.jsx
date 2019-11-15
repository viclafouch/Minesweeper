import React, { useEffect, useRef, useState } from 'react'
import './died.scss'
import { randomIntFromInterval } from '@utils/index'

function Died({ hasLost, retry }) {
  const [isShowingRetry, setIsShowingRetry] = useState(false)
  const [audio, setAudio] = useState(1)
  const audioA = useRef(null)
  const audioB = useRef(null)

  useEffect(() => {
    setAudio(randomIntFromInterval(1, 2))
  }, [hasLost])

  useEffect(() => {
    const audioACurrent = audioA.current
    const audioBCurrent = audioB.current
    let timeout
    if (hasLost) {
      if (audio === 1) {
        audioACurrent.play()
        timeout = setTimeout(() => setIsShowingRetry(true), 6000)
      }
      if (audio === 2) {
        audioBCurrent.play()
      }
    }
    return () => {
      clearTimeout(timeout)
      if (audioACurrent) audioACurrent.pause()
      if (audioBCurrent) audioBCurrent.pause()
      setIsShowingRetry(false)
    }
  }, [audio, hasLost])

  return (
    <>
      <div className={`Died ${hasLost && audio === 1 ? 'show' : ''}`}>
        <span className="Died-text">You Died</span>
        {isShowingRetry && (
          <button type="button" onClick={retry}>
            Retry
          </button>
        )}
      </div>

      <audio ref={audioA} src="https://www.myinstants.com/media/sounds/dark-souls-_you-died_-sound-effect-from-youtube.mp3">
        <track default kind="captions" />
      </audio>
      <audio ref={audioB} src="https://www.myinstants.com/media/sounds/roblox-death-sound-effect.mp3">
        <track default kind="captions" />
      </audio>
    </>
  )
}

export default Died
