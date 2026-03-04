import { useApiKey } from '../../hooks/useApiKey'
import './ParamsForm.css'

// Fully controlled — all state lives in App.jsx so it survives route changes.
function ParamsForm({ endpointDef, onSubmit, loading, formState, setFormState }) {
  const { apiKey } = useApiKey()
  const { params, saveAs, autoSave } = formState

  const handleParam = (key, value) => {
    setFormState(prev => ({ ...prev, params: { ...prev.params, [key]: value } }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!apiKey) {
      alert('Please save your API key first.')
      return
    }
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    )
    onSubmit({
      endpoint: endpointDef.endpoint,
      params: cleanParams,
      apiKey,
      saveAs: autoSave ? saveAs : undefined,
    })
  }

  if (!endpointDef) {
    return (
      <div className="params-empty">
        <span>← Select an endpoint</span>
      </div>
    )
  }

  return (
    <form className="params-form" onSubmit={handleSubmit}>
      <div className="params-header">
        <div>
          <div className="params-title">{endpointDef.label}</div>
          <div className="params-path mono">GET /{endpointDef.endpoint}</div>
        </div>
      </div>

      <div className="params-fields">
        {endpointDef.params.length === 0 ? (
          <p className="params-no-params mono">No parameters required for this endpoint.</p>
        ) : (
          endpointDef.params.map(p => (
            <div key={p.key} className="param-field">
              <label>
                {p.key}
                {p.required && <span className="required">*</span>}
              </label>
              <input
                type="text"
                placeholder={p.placeholder}
                value={params[p.key] || ''}
                onChange={e => handleParam(p.key, e.target.value)}
              />
              <span className="param-desc">{p.label}</span>
            </div>
          ))
        )}
      </div>

      <div className="params-save-row">
        <label className="save-toggle">
          <input
            type="checkbox"
            checked={autoSave}
            onChange={e => setFormState(prev => ({ ...prev, autoSave: e.target.checked }))}
          />
          <span>Save as JSON</span>
        </label>
        {autoSave && (
          <input
            type="text"
            className="save-name-input"
            value={saveAs}
            onChange={e => setFormState(prev => ({ ...prev, saveAs: e.target.value }))}
            placeholder="filename (without extension)"
          />
        )}
      </div>

      <button
        type="submit"
        className="btn primary submit-btn"
        disabled={loading || !apiKey}
      >
        {loading ? (
          <><span className="spinner" />FETCHING...</>
        ) : (
          <>▶ FETCH DATA</>
        )}
      </button>
    </form>
  )
}

export default ParamsForm
