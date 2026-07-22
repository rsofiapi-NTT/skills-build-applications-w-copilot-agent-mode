import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('workouts')
      .then((data) => {
        if (!ignore) {
          setWorkouts(data)
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
    return <p className="state-message">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="state-message error">{error}</p>
  }

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Workouts</p>
        <h2>Suggested sessions</h2>
      </div>
      <div className="card-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id}>
            <h3>{workout.title}</h3>
            <p>{workout.focusArea}</p>
            <dl>
              <div>
                <dt>Level</dt>
                <dd>{workout.level}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
            </dl>
            <ul className="exercise-list">
              {(workout.exercises ?? []).map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts