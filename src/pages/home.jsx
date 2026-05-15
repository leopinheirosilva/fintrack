import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing, signout } = useAuthContext()

  if (isInitializing) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1>Olá, {user.first_name}! </h1>
      <Button onClick={signout}>Sair</Button>
    </div>
  )
}

export default HomePage
