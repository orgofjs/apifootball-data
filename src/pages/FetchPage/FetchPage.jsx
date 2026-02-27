import { useState } from 'react'
import ApiKeyInput from '../../components/ApiKeyInput/ApiKeyInput'
import EndpointSelector from '../../components/EndpointSelector/EndpointSelector'
import ParamsForm from '../../components/ParamsForm/ParamsForm'
import ResponsePanel from '../../components/ResponsePanel/ResponsePanel'
import { findEndpoint } from '../../utils/endpoints'
import { useFetch } from '../../hooks/useFetch'
import './FetchPage.css'

function FetchPage() {
  const [selectedEndpointId, setSelectedEndpointId] = useState(null)
  const { loading, error, result, savedAs, fetchEndpoint } = useFetch()

  const selectedEndpoint = selectedEndpointId ? findEndpoint(selectedEndpointId) : null

  const handleSelect = (id) => {
    setSelectedEndpointId(id)
  }

  return (
    <div className="fetch-page">
      <div className="fetch-top">
        <ApiKeyInput />
      </div>

      <div className="fetch-body">
        <aside className="fetch-sidebar">
          <EndpointSelector
            selectedId={selectedEndpointId}
            onSelect={handleSelect}
          />
        </aside>

        <section className="fetch-params">
          <ParamsForm
            endpointDef={selectedEndpoint}
            onSubmit={fetchEndpoint}
            loading={loading}
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
