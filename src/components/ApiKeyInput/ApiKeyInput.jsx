import { useState } from 'react'
import { useApiKey } from '../../hooks/useApiKey'
import './ApiKeyInput.css'

function ApiKeyInput() {
  const { apiKey, setApiKey } = useApiKey()
  const [inputVal, setInputVal] = useState(apiKey)
  const [saved, setSaved] = useState(!!apiKey)
  const [visible, setVisible] = useState(false)

  const handleSave = () => {
    setApiKey(inputVal.trim())
    setSaved(true)
  }

  const handleClear = () => {
    setApiKey('')
    setInputVal('')
    setSaved(false)
  }

  const handleChange = (e) => {
    setInputVal(e.target.value)
    setSaved(false)
  }

  const maskedKey = inputVal
    ? `${inputVal.slice(0, 6)}${'●'.repeat(Math.max(0, inputVal.length - 12))}${inputVal.slice(-6)}`
    : ''

  return (
    <div className="apikey-wrap">
      <div className="apikey-label-row">
        <label>API KEY</label>
        <span className={`apikey-status ${saved ? 'ok' : 'missing'}`}>
          {saved ? '✓ STORED IN LOCALSTORAGE' : '⚠ KEY NOT SAVED'}
        </span>
      </div>
      <div className="apikey-row">
        <input
          type={visible ? 'text' : 'password'}
          value={inputVal}
          onChange={handleChange}
          placeholder="Enter your x-apisports-key..."
          className="apikey-input"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          className="btn apikey-toggle"
          onClick={() => setVisible(v => !v)}
          title={visible ? 'Hide' : 'Show'}
          type="button"
        >
          {visible ? 'HIDE' : 'SHOW'}
        </button>
        <button
          className="btn primary"
          onClick={handleSave}
          disabled={!inputVal.trim() || saved}
          type="button"
        >
          SAVE
        </button>
        {saved && (
          <button className="btn danger" onClick={handleClear} type="button">
            CLEAR
          </button>
        )}
      </div>
    </div>
  )
}

export default ApiKeyInput
