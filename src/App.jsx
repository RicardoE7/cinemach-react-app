import React from 'react'
import Search from './components/Search.jsx'

const App = () => {
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>Because Choosing A <span className='text-gradient'>Movie</span> Shouldn't Take Longer Than Watching One</h1>
        </header>
        <Search/>
      </div>
    </main>
  )
}

export default App