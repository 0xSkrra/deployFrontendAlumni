import { useKeycloak } from '@react-keycloak/web'
import { useCallback, useEffect } from 'react'
import { defaultUserProfile } from '../../common/interface/UserProfile'
import { getUserProfile } from '../../common/util/API'
import { useUserStore } from '../../common/util/Store/userStore'

const StartPage = () => {
  const {keycloak} = useKeycloak()
  const userState = useUserStore.getState()
  const login = useCallback( async () => {
    keycloak?.login()
  }, [keycloak])

  const logout = useCallback( async () => {
    localStorage.removeItem('user')
    keycloak?.logout()
  }, [keycloak])

  //
  useEffect(() => {
    if(keycloak.authenticated){
      const user = getUserProfile()
      userState.setUser(user)
    }else userState.setUser(defaultUserProfile)
    
  }, [keycloak.authenticated, userState])

  //if(keycloak.authenticated) return <Navigate to='/home'></Navigate>

  return (
    <div className='break-words max-w-screen w-screen'>
        <h1>Start Page</h1>

        <section className="actions">
        {!keycloak.authenticated && (
            <button onClick={login}>Login</button>
        )}
        {keycloak.authenticated && (
        <div>
            <h4>Token</h4>
            <p className=''>{keycloak.token}</p>
        </div>)}

        {keycloak.authenticated && (
            <button onClick={logout}>Logout</button>
        )}
       </section>

    </div>
  )
}

export default StartPage