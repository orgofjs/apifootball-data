import ApiKeyInput from '../../components/ApiKeyInput/ApiKeyInput'
import EndpointSelector from '../../components/EndpointSelector/EndpointSelector'
import ParamsForm from '../../components/ParamsForm/ParamsForm'
import ResponsePanel from '../../components/ResponsePanel/ResponsePanel'
import { findEndpoint } from '../../utils/endpoints'
import './FetchPage.css'

function FetchPage({ fetchState, selectedEndpointId, onSelectEndpoint, formState, setFormState }) {
  const { loading, error, result, savedAs, fetchEndpoint } = fetchState
  const selectedEndpoint = selectedEndpointId ? findEndpoint(selectedEndpointId) : null

  return (
    <div className="fetch-page">
      <div className="fetch-top">
        <ApiKeyInput />
      </div>

      <div className="fetch-body">
        <aside className="fetch-sidebar">
          <EndpointSelector
            selectedId={selectedEndpointId}
            onSelect={onSelectEndpoint}
          />
        </aside>

        <section className="fetch-params">
          <ParamsForm
            endpointDef={selectedEndpoint}
            onSubmit={fetchEndpoint}
            loading={loading}
            formState={formState}
            setFormState={setFormState}
          />
        </section>

        <section className="fetch-response">
          <div className="section-label">RESPONSE</div>
          <ResponsePanel
            result={result}
            error={error}
            savedAs={savedAs}
            loading={loading}
          />
        </section>
      </div>
    </div>
  )
}

export default FetchPage
