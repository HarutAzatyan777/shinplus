import React, { useEffect, useState } from 'react'

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
      setDarkMode(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <button
      onClick={() => setDarkMode(prev => !prev)}
      style={{
        padding: '10px 20px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: darkMode ? '#4da6ff' : '#ddd',
        color: darkMode ? '#121212' : '#333',
        fontWeight: '600',
        boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease',
        userSelect: 'none',
        marginBottom: '1.5rem',
        alignSelf: 'flex-end'
      }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? 'Light' : 'Dark'}
    </button>
  )
}

export default DarkModeToggle
