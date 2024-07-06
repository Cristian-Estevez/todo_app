import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../hooks/useAuth'
import { login } from '../../services/authServices'

const TOKEN_STORAGE_KEY = 'todo_app_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(
    localStorage.getItem(TOKEN_STORAGE_KEY) || ''
  )
  const navigate = useNavigate()
  const loginAction = async (data) => {
    try {
      const res = await login(data)

      // setUser(res.data.user) // api is not returning user yet
      setToken(res.token)
      localStorage.setItem(TOKEN_STORAGE_KEY, res.token)
      navigate('/folders')
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
