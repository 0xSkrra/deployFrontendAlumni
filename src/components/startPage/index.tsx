import React from 'react'
import keycloak from '../../keycloak'

const StartPage = () => {
  return (
    <div>
        <h1>Start Page</h1>

        <section className="actions">
        {!keycloak.authenticated && (
            <button onClick={() => keycloak.login()}>Login</button>
        )}
        {keycloak.authenticated && (
            <button onClick={() => keycloak.logout()}>Logout</button>
        )}
        </section>

        {keycloak.token && (
        <div>
            <h4>Token</h4>
            <pre>{keycloak.token}</pre>
        </div>
        )}

    </div>
  )
}

export default StartPage