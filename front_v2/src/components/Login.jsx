import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function List() {
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const auth = useAuth()
  const handleSubmitEvent = (e) => {
    e.preventDefault()
    if (input.username !== '' && input.password !== '') {
      auth.loginAction(input)
      return
    }
    alert('please provide a valid input')
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='bg-slate-600 p-8 rounded-lg'>
      <form
        onSubmit={handleSubmitEvent}
        className='flex flex-col gap-2'
      >
        <label htmlFor='user-email'>Username:</label>
        <input
          type='text'
          id='usernam'
          name='username'
          placeholder='example@yahoo.com'
          aria-describedby='user-email'
          aria-invalid='false'
          onChange={handleInput}
          value={input.username}
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          aria-describedby='user-password'
          aria-invalid='false'
          onChange={handleInput}
          value={input.password}
        />
        <input
          type='submit'
          value='Login'
        />
      </form>
    </div>
  )
}
