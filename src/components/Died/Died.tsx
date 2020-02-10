import * as React from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import './died.scss'
import { randomIntFromInterval } from '../../utils'
import cEtaitSurEnfait from './video.mp4'

type DiedProps = {
  hasLost: boolean
  isVolumeEnabled: boolean
  retry: any
  status: string
}

function Died({ hasLost, retry, isVolumeEnabled, status }: DiedProps): JSX.Element {
  const [isShowingActions, setIsShowingActions] = useState<boolean>(false)
  const [audio, setAudio] = useState<number>(randomIntFromInterval(1, 3))
  const [forceHide, setForceHide] = useState<boolean>(false)
  const audioA = useRef<HTMLAudioElement>(null)
  const audioB = useRef<HTMLAudioElement>(null)

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) retry()
    },
    [retry]
  )

  useEffect(() => {
    if (hasLost) document.body.addEventListener('keydown', handleEscape)
    return (): void => {
      document.body.removeEventListener('keydown', handleEscape)
    }
  }, [handleEscape, hasLost])

  useEffect(() => {
    if (!isVolumeEnabled) setAudio(null)
    else if (status === 'in progress') setAudio(randomIntFromInterval(1, 3))
  }, [isVolumeEnabled, status])

  useEffect(() => {
    if (hasLost) {
      const audioACurrent: HTMLAudioElement = audioA.current
      const audioBCurrent: HTMLAudioElement = audioB.current
      let timeout: number
      if (audio === 1) {
        audioACurrent.play()
        timeout = window.setTimeout(() => setIsShowingActions(true), 6000)
      }
      if (audio === 2) {
        audioBCurrent.play()
      }
      return (): void => {
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
            <button type="button" onClick={(): void => setForceHide(true)} className="see-result-button">
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
