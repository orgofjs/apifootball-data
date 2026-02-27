import { useState, useEffect } from 'react'

const KEY = 'apifootball_api_key'

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState(() => localStorage.getItem(KEY) || '')

  const setApiKey = (key) => {
    setApiKeyState(key)
    if (key) {
      localStorage.setItem(KEY, key)
    } else {
      localStorage.removeItem(KEY)
    }
  }

  return { apiKey, setApiKey }
}
