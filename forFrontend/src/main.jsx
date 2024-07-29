import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import WorkoutContextProvider from './context/WorkoutContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <AuthContextProvider>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
    </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
)

