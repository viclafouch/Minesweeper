import * as React  from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import './died.scss'
import { randomIntFromInterval } from '../../utils'
import cEtaitSurEnfait from './video.mp4'

function Died({ hasLost, retry, isVolumeEnabled, status }) {
  const [isShowingActions, setIsShowingActions] = useState(false)
  const [audio, setAudio] = useState(randomIntFromInterval(1, 3))
  const [forceHide, setForceHide] = useState(false)
  const audioA = useRef(null)
  const audioB = useRef(null)

  const handleEscape = useCallback(
    e => {
      if (e.keyCode === 27) retry()
    },
    [retry]
  )

  useEffect(() => {
    if (hasLost) document.body.addEventListener('keydown', handleEscape)
    return () => {
      document.body.removeEventListener('keydown', handleEscape)
    }
  }, [handleEscape, hasLost])

  useEffect(() => {
    if (!isVolumeEnabled) setAudio(null)
    else if (status === 'in progress') setAudio(randomIntFromInterval(1, 3))
  }, [isVolumeEnabled, status])

  useEffect(() => {
    if (hasLost) {
      const audioACurrent = audioA.current
      const audioBCurrent = audioB.current
      let timeout
      if (audio === 1) {
        audioACurrent.play()
        timeout = setTimeout(() => setIsShowingActions(true), 6000)
      }
      if (audio === 2) {
        audioBCurrent.play()
      }
      return () => {
        clearTimeout(timeout)
        if (audioACurrent) audioACurrent.pause()
        if (audioBCurrent) audioBCurrent.pause()
        audioACurrent.currentTime = 0
        audioBCurrent.currentTime = 0
        setIsShowingActions(false)
        setForceHide(false)
      }
    }
  }, [audio, hasLost])

  return (
    <>
      <div className={`Died ${hasLost && audio === 1 && !forceHide ? 'show' : ''}`}>
        <span className="Died-text">You Died</span>
        {isShowingActions && (
          <>
            <button type="button" onClick={retry} className="retry-button">
              Retry
            </button>
            <button type="button" onClick={() => setForceHide(true)} className="see-result-button">
              See result
            </button>
          </>
        )}
      </div>
      {hasLost && audio === 3 && (
        <div className="miniplayer-died">
          <p>REPLAY ! (fake)</p>
          <video className="" autoPlay>
            <track default kind="captions" />
            <source src={cEtaitSurEnfait} type="video/mp4" />
          </video>
        </div>
      )}

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
