import { useState } from 'react'
import AuthProvider from './provider/authProvider'
import Routes from './routes'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </AuthProvider>
  )
}

export default App