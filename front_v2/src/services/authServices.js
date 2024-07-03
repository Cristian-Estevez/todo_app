import getCookie from '../utils/cookieUtils'

const LOGIN_URL = 'http://127.0.0.1:8000/api/login/'

const login = async (data) => {
  const csrfToken = getCookie('csrftoken')

  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(data)
    })

    if (!response) throw new Error('Failed to login.')

    return response.json()
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

export { login }
