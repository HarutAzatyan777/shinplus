import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './router'
import { Provider } from 'react-redux'
import store from './redux/store' // համոզվիր, որ ուղին ճիշտ է
// import useAuthPersistence from './helpers/useAuthPersistence'

function App() {
  // useAuthPersistence();
  return (
    <Provider store={store}>
      
      <Router>
        <AppRouter />
      </Router>
      
    </Provider>
  )
}

export default App
