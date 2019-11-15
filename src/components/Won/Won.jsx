import React from 'react'
import './won.scss'

function Won({ hasWon }) {
  return (
    <div className={`Won ${hasWon ? 'show' : ''}`}>
      {hasWon && (
        <div className="Won-wrapper">
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
        </div>
      )}
    </div>
  )
}

export default Won
