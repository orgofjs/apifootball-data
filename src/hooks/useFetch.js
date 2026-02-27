import { useState, useCallback } from 'react'

export function useFetch() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [savedAs, setSavedAs] = useState(null)

  const fetchEndpoint = useCallback(async ({ endpoint, params, apiKey, saveAs }) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setSavedAs(null)

    try {
      const res = await fetch('/api/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint, params, apiKey, saveAs }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || `Request failed: ${res.status}`)
      }

      setResult(json.data)
      if (json.savedAs) setSavedAs(json.savedAs)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    setResult(null)
    setError(null)
    setSavedAs(null)
  }, [])

  return { loading, error, result, savedAs, fetchEndpoint, clear }
}
