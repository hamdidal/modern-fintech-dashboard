import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { ROUTES } from '@constants'

interface PublicRouteProps {
  children: JSX.Element
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return children
}

