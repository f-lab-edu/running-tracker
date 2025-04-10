import React from 'react'
import ReactDOM from 'react-dom/client'
import '@app/style/index.css'
import App from '@app/index'

// MSW 개발 환경에서만 활성화
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start({ onUnhandledRequest: 'bypass' })
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
