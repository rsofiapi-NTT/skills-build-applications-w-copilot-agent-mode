import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpointPath = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection(endpointPath)
      .then((data) => {
        if (!ignore) {
          setUsers(data)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="state-message">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="state-message error">{error}</p>
  }

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Users</p>
        <h2>Athlete profiles</h2>
      </div>
      <div className="card-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.fitnessGoal}</p>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt>Favorite</dt>
                <dd>{user.favoriteActivity}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users