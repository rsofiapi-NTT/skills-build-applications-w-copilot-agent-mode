import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpointPath = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection(endpointPath)
      .then((data) => {
        if (!ignore) {
          setTeams(data)
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
    return <p className="state-message">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="state-message error">{error}</p>
  }

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Teams</p>
        <h2>Training groups</h2>
      </div>
      <div className="card-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id}>
            <h3>{team.name}</h3>
            <p>{team.focus}</p>
            <dl>
              <div>
                <dt>City</dt>
                <dd>{team.city}</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{team.memberIds?.length ?? 0}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams