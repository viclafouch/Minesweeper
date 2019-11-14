import React from 'react'
import Board from './containers/Board'
import Header from './components/Header/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-game">
        <Board />
      </div>
    </div>
  )
}

export default App
