import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from '../../services/authServices'
import { AuthContext } from '../../hooks/useAuth'

const TOKEN_STORAGE_KEY = 'todo_app_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('site') || '')
  const navigate = useNavigate()
  const loginAction = async (data) => {
    try {
      const res = await login(data)

      setUser(res.data.user)
      setToken(res.token)
      localStorage.setItem(TOKEN_STORAGE_KEY, res.token)
      navigate('/FolderList')
      return
    } catch (error) {
      console.error(error)
    }
  }

  const logOut = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
