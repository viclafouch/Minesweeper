import React from 'react'
import './won.scss'

function Won({ hasWon, isVolumeEnabled }) {
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
              autoPlay
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
