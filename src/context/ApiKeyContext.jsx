import { createContext, useContext, useState } from 'react'

const ApiKeyContext = createContext(null)

const LS_KEY = 'apifootball_api_key'

export function ApiKeyProvider({ children }) {
  const [apiKey, setApiKeyState] = useState(() => localStorage.getItem(LS_KEY) || '')

  const setApiKey = (key) => {
    setApiKeyState(key)
    if (key) {
      localStorage.setItem(LS_KEY, key)
    } else {
      localStorage.removeItem(LS_KEY)
    }
  }

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  )
}

export function useApiKey() {
  return useContext(ApiKeyContext)
}
