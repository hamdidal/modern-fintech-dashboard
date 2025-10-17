import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { AppRoutes } from '@routes'
import { createQueryClient, initializeI18n } from '@config'
import { TOAST_CONFIG } from '@constants'
import 'react-toastify/dist/ReactToastify.css'
import '@styles/global.scss'
import { useTranslation } from 'react-i18next'

initializeI18n()

const queryClient = createQueryClient()

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const { t } = useTranslation()

  if (!googleClientId) {
    toast.warning(t('app.googleClientIdNotSet'))
  }

  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={googleClientId || ''}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AppRoutes />
          </BrowserRouter>
          <ToastContainer {...TOAST_CONFIG} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  )
}