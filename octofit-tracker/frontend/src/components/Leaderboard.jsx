import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpointPath = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection(endpointPath)
      .then((data) => {
        if (!ignore) {
          setEntries(data)
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
    return <p className="state-message">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="state-message error">{error}</p>
  }

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Leaderboard</p>
        <h2>Weekly standings</h2>
      </div>
      <div className="stack-list">
        {entries.map((entry) => (
          <article className="metric-row" key={entry._id}>
            <strong>#{entry.rank}</strong>
            <span>{entry.userId?.name ?? 'Unknown athlete'}</span>
            <span>{entry.points} pts</span>
            <span>{entry.weeklyActivityMinutes} min</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard