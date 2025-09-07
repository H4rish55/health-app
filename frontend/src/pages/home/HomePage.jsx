import React from 'react'
import NavBar from '../../components/NavBar'
import { useAuthStore } from '../../store/authUser'
import UserHomeScreen from './UserHomeScreen'
import AuthScreen from './AuthScreen'

const HomePage = () => {
  const { user } = useAuthStore()

  return (
    <div>
      {user ? <UserHomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage