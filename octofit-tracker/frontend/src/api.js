const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiHostUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiHostUrl}/api`

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data?.results)) {
    return payload.data.results
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items
  }

  return []
}

export async function fetchCollection(endpointPath) {
  const requestUrl = endpointPath.startsWith('http')
    ? endpointPath
    : endpointPath.startsWith('/api/')
    ? `${apiHostUrl}${endpointPath}`
    : `${apiBaseUrl}/${endpointPath}/`
  const response = await fetch(requestUrl)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return collectionFromResponse(await response.json())
}