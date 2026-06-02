import React from 'react'

const Spinner = () => {
  return (
    <div role="status" aria-label="Loading">
      <div className="spinner" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner
