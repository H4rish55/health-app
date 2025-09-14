import React from 'react'
import NavBar from '../../components/NavBar'
import HeartPredictPage from '../main/HeartPredictPage'
import StrokePredictPage from '../main/StrokePredictPage'
import DiabetesPredictPage from '../main/DiabetesPredictPage'
import ModelLayout from '../../layouts/ModelLayout'
import ChatbotPage from '../ChatbotPage'

const UserHomeScreen = () => {
  return (
    <div>
      <ModelLayout />
        <StrokePredictPage/>
        <ChatbotPage />
    </div>
  )
}

export default UserHomeScreen