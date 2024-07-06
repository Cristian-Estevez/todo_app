import './App.css'
import 'material-icons/iconfont/filled.css'
import 'material-icons/iconfont/outlined.css'

import { AuthProvider } from './components/auth/AuthProvider'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/router/PrivateRoute'
import List from './components/List'
import Login from './components/Login'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {['/login', '/'].map((path, index) => (
          <Route
            key={index}
            path={path}
            element={<Login />}
          />
        ))}
        <Route element={<PrivateRoute />}>
          <Route
            path='/folders'
            element={<List />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
